import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}">Verify Email</a>
<!--        <div>-->
<!--            <h1>Verify Your Email</h1>-->
<!--            <p>Click the link below to verify your email address</p>-->
<!--        </div>-->
`
            },
        },
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            // admin: {
            //     condition: ({req}) => req.user.role === "admin",
            // },
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ],
        },
    ],
}
