import type { CollectionConfig } from 'payload'
import type { User } from '../../../config/payload-types'


const addUser: ({
    req,
    data,
}: {
    req: any
    data: any
}) => Promise<any> = async ({ req, data }) => {
    const user = req.user as User | null
    return { ...data, user: user?.id }
}

const yourOwnAndPurchased: ({
    req,
}: {
    req: any
}) => Promise<boolean | { id: { in: any[] } }> = async ({ req }) => {
    const user = req.user as User | null

    if (user?.role === 'admin') return true
    if (!user) return false

    const { docs: products } = await req.payload.find({
        collection: 'products',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    })

    const ownProductFileIds = products.map((prod) => prod.productFiles).flat()

    const { docs: orders } = await req.payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            user: {
                equals: user.id,
            },
        },
    })

    const purchasedProductFileIds = orders
        .map((order) => {
            // @ts-ignore
            return order.products.map((product) => {
                if (typeof product === 'string')
                    return req.payload.logger.error(
                        'Search depth not sufficient to find purchased file IDs'
                    )
                if (typeof product.productFiles === 'string')
                    return product.productFiles
                else {
                    // @ts-ignore
                    return product.productFiles.id
                }
            })
        })
        .filter(Boolean)
        .flat()

    return {
        id: {
            in: [...ownProductFileIds, ...purchasedProductFileIds],
        },
    }
}

export const ProductFiles: CollectionConfig = {
    // @ts-ignore
    slug: 'productFiles',
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
        // @ts-ignore
        update: ({ req }) => req.user.role === 'admin',
        // @ts-ignore
        delete: ({ req }) => req.user.role === 'admin',
    },
    upload: {
        staticDir: 'productFiles',
        mimeTypes: ['image/*', 'font/*', 'application/postscript'],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            admin: {
                condition: () => false,
            },
            hasMany: false,
            required: true,
        },
    ],
}
