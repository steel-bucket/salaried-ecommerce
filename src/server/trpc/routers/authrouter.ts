import { publicProcedure, router } from '../trpc'
import { AuthCredentialsValidator } from '../../../lib/accountcredvallidator'
import { getPayloadClient } from '../../getpayload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

export const authRouter = router({
    createPayloadUser: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input }) => {
            const { email, password } = input
            const payload = await getPayloadClient()

            const { docs: users } = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email,
                    },
                },
            })

            if (users.length !== 0) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'User already exists',
                })
            }

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user',
                },
            })

            return { success: true, sentToEmail: email }
        }),
    verify: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input }) => {
            const { token } = input
            const payload = await getPayloadClient()
            const isVerified = await payload.verifyEmail({
                collection: 'users',
                token: token,
            })
            if (!isVerified) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }
            return { success: true }
        }),
    login: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input, ctx }) => {
            const { res } = ctx
            const { email, password } = input
            const payload = await getPayloadClient()
            try {
                await payload.login({
                    collection: 'users',
                    data: {
                        email,
                        password,
                    },
                    res,
                })
                return { success: true }
            } catch (err) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }
        }),
    sendEmail: publicProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
                message: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { name, email, message } = input;

            // Get the Payload client (which is already configured with Resend as the transporter)
            const payloadClient = await getPayloadClient();

            // Set up the email options. The "from" is set to the default in your Payload config.
            const emailOptions = {
                to: '22bec038@iiitdmj.ac.in', // Target email address
                from: 'onboarding@resend.dev', // Use the configured default sender
                subject: `New Contact Form Submission from ${name}`,
                text: message,
                html: `<p>${message}</p>`,
            };

            try {
                // Use the Payload client's email sending function
                await payloadClient.sendEmail(emailOptions);
                return { success: true, message: 'Email sent successfully.' };
            } catch (error) {
                console.error('Error sending email:', error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to send email.',
                });
            }
        }),

})
