import { Access, CollectionConfig } from 'payload/types'
import { Email } from '../../components/Emails/Email'

const adminsAndUser: Access = ({ req: { user } }) => {
    if (user.role === 'admin') return true
    return {
        id: {
            equals: user.id,
        },
    }
}

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                // return `<a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verify?token=${token}">Verify Email</a>`
                return Email({
                    actionLabel: 'verify your email',
                    buttonText: 'Verify Email',
                    href: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verify?token=${token}`,
                })
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: () => true,
        update: ({ req }) => req.user.role === 'admin',
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
