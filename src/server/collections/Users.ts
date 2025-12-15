import type { CollectionConfig } from 'payload'

const adminsAndUser: ({ req: { user } }: { req: { user: any } }) =>
    | boolean
    | {
          id: { equals: any }
      } = ({ req: { user } }) => {
    // @ts-ignore
    if (user.role === 'admin') return true
    return {
        id: {
            // @ts-ignore
            equals: user.id,
        },
    }
}

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        // @ts-ignore
        verify: {
            generateEmailHTML: ({ token }) => {
                return `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                        </head>
                        <body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;">
                            <div style="margin: 0 auto; padding: 20px 0 48px; max-width: 600px;">
                                <p style="font-size: 16px; line-height: 26px;">Hi there,</p>
                                <p style="font-size: 16px; line-height: 26px;">
                                    Welcome to Salaried, the marketplace for high quality digital goods. Use the button below to verify your email.
                                </p>
                                <div style="text-align: center; margin: 32px 0;">
                                    <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}" style="padding: 12px 24px; background-color: #2563eb; border-radius: 3px; color: #fff; font-size: 16px; text-decoration: none; display: inline-block;">
                                        Verify Email
                                    </a>
                                </div>
                                <p style="font-size: 16px; line-height: 26px;">
                                    Best,<br/>
                                    Deep
                                </p>
                                <hr style="border-color: #cccccc; margin: 20px 0; border: none; border-top: 1px solid #cccccc;">
                                <p style="color: #8898aa; font-size: 12px;">
                                    If you did not request this email, you can safely ignore it.
                                </p>
                            </div>
                        </body>
                    </html>
                `
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: () => true,
        // @ts-ignore
        update: ({ req }) => req.user.role === 'admin',
        // @ts-ignore
        delete: ({ req }) => req.user.role === 'admin',
    },
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
        defaultColumns: ['id'],
    },
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'productFiles',
            label: 'Product files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'productFiles',
            hasMany: true,
        },
        {
            name: 'role',
            defaultValue: 'user',
            required: true,

            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
        },
    ],
}
