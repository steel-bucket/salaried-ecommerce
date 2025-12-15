import type { CollectionConfig } from 'payload'

const yourOwn: ({ req: { user } }: { req: { user: any } }) =>
    | boolean
    | {
          user: { equals: any }
      } = ({ req: { user } }) => {
    // @ts-ignore
    if (user.role === 'admin') return true

    return {
        user: {
            equals: user?.id,
        },
    }
}

export const Orders: CollectionConfig = {
    // @ts-ignore
    slug: 'orders',
    admin: {
        useAsTitle: 'id',
        description: 'A summary of all your orders.',
    },
    access: {
        read: yourOwn,
        // @ts-ignore
        update: ({ req }) => req.user.role === 'admin',
        // @ts-ignore
        delete: ({ req }) => req.user.role === 'admin',
        // @ts-ignore
        create: ({ req }) => req.user.role === 'admin',
    },
    fields: [
        {
            name: '_isPaid',
            type: 'checkbox',
            access: {
                // @ts-ignore
                read: ({ req }) => req.user.role === 'admin',
                create: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            admin: {
                hidden: true,
            },
            relationTo: 'users',
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true,
        },
    ],
}
