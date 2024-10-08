import { Access, CollectionConfig } from 'payload/types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { User } from '../../../config/payload-types'

const addUser: BeforeChangeHook = ({ req, data }) => {
    const user = req.user as User | null
    return { ...data, user: user?.id }
}

const yourOwnAndPurchased: Access = async ({ req }) => {
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
    slug: 'productFiles',
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
    },
    upload: {
        staticURL: '/productFiles',
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
