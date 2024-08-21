import { CollectionConfig } from 'payload/types'
import { PRODUCT_CATEGORIES } from '../../../config/webConfig'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
    fields: [
        {
            name: 'creator',
            label: 'Creator',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Product Details',
        },
        {
            name: 'price',
            label: 'Price in USD',
            min: 0,
            type: 'number',
            required: true,
        },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
                label,
                value,
            })),
        },
        {
            name: 'productfiles',
            label: 'Product File(s)',
            type: 'relationship',
            required: true,
            relationTo: 'productfiles',
            hasMany: true,
        },
        {
            name: 'approvedForSale',
            label: 'Product Status',
            type: 'select',
            defaultValue: 'pending',
            access: {
                create: ({ req }) => req.user.role === 'admin',
                read: ({ req }) => req.user.role === 'admin',
                update: ({ req }) => req.user.role === 'admin',
            },
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Denied', value: 'denied' },
            ],
        },
        {
            name: 'priceId',
            access: {
                create: ({ req }) => false,
                read: ({ req }) => false,
                update: ({ req }) => false,
            },
            type: 'text',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'stripeId',
            access: {
                create: ({ req }) => false,
                read: ({ req }) => false,
                update: ({ req }) => false,
            },
            type: 'text',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'images',
            type: 'array',
            label: 'Product Images',
            minRows: 1,
            maxRows: 4,
            labels: {
                singular: 'Image',
                plural: 'Images',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}
