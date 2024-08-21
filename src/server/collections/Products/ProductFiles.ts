import { Access, CollectionConfig } from 'payload/types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { User } from '../../../config/payload-types'

const addUser: BeforeChangeHook = ({ req, data }) => {
    const user = req.user as User | null
    return { ...data, user: user?.id }
}

const yourownandpurchased: Access = async ({ req }) => {
    const user = req.user as User | null
    if (!user) return false
    if (user.role === 'admin') return true

    const { docs: products } = await req.payload.find({
        collection: 'products',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    })

    const ownproductids = products.map((prod)=>prod.productfiles).flat()
    const { docs: orders } = await req.payload.find({
        collection: 'products',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    })

}

export const ProductFiles: CollectionConfig = {
    slug: 'productfiles',
    admin: {
        hidden: ({ user }) => user.role != 'admin',
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourownandpurchased,
    },
    upload: {
        staticURL: '/productfiles',
        staticDir: 'productfiles',
        mimeTypes: ['image/*', 'font/*', 'applications/postscript'],
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
