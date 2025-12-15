import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'

import path from 'path'

import { Users } from '../server/collections/Users'
import { Products } from '../server/collections/Products/Products'
import { Media } from '../server/collections/Media'
import { ProductFiles } from '../server/collections/Products/ProductFiles'
import { Orders } from '../server/collections/Products/Orders'

import dotenv from 'dotenv'

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
})

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || '',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media, ProductFiles, Orders],
    admin: {
        user: 'users',
        meta: {
            titleSuffix: 'Salaried',
        },
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGO_URL!,
    }),
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''],
    typescript: {
        outputFile: path.resolve(process.cwd(), 'src/config/payload-types.ts'),
    },
})

