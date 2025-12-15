import type { CollectionConfig } from 'payload'
import type { User } from '../../config/payload-types'

const isAdminOrHasAccessToImages =
    (): (({
        req,
    }: {
        req: any
    }) => Promise<boolean | { user: { equals: any } }>) =>
    async ({ req }) => {
        const user = req.user as unknown as User | undefined

        if (!user) return false
        if (user.role === 'admin') return true

        return {
            user: {
                // @ts-ignore
                equals: req.user.id,
            },
        }
    }

export const Media: CollectionConfig = {
    // @ts-ignore
    slug: 'media',
    hooks: {
        beforeChange: [
            ({ req, data }) => {
                // @ts-ignore
                return { ...data, user: req.user.id }
            },
        ],
    },
    access: {
        read: async ({ req }) => {
            // @ts-ignore
            const referer = req.headers.referer

            if (!req.user || !referer?.includes('sell')) {
                return true
            }

            return await isAdminOrHasAccessToImages()({ req })
        },
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages(),
    },
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
    },
    upload: {
        staticDir: 'media',
        mimeTypes: ['image/*'],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
    ],
}
