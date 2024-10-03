import { privateProcedure, router } from '../trpc'
import { z } from 'zod'
import { getPayloadClient } from '@/server/getpayload'
export const paymentrouter = router({
    createSession: privateProcedure
        .input(z.object({ productIds: z.array(z.string()) }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx
            let { productIds } = input

            if (productIds.length === 0) {
                throw new Error('404 Bad Request')
            }

            const payload = await getPayloadClient()

            const { docs: products } = await payload.find({
                collection: 'products',
                where: {
                    id: {
                        in: productIds,
                    },
                },
            })

        }),
})
