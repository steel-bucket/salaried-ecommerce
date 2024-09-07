import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'

import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from '../server/collections/Users'

import dotenv from 'dotenv'
import { Products } from '../server/collections/Products/Products'
import { Media } from '../server/collections/Media'
import { ProductFiles } from '../server/collections/Products/ProductFiles'
import { Orders } from '../server/collections/Products/Orders'

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media, ProductFiles, Orders],
    routes: {
        admin: '/sell',
    },
    admin: {
        user: 'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: 'Salaried',
            favicon: '/wallet.svg',
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGO_URL!,
    }),
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
})
