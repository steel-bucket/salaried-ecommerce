import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'

import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from '../server/collections/Users'

import dotenv from 'dotenv'

dotenv.config({
    path: path.resolve(__dirname, '../../.env.local'),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    collections: [Users],
    routes: {
        'admin': '/sell',
    },
    admin:{
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: 'Salaried',
            favicon: '/wallet.svg',
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db:mongooseAdapter({
        url: process.env.MONGO_URL!,
    }),
    csrf: [
        "http://localhost:3000",
    ],
    typescript: {
        outputFile: path.resolve(__dirname, '/payload-types.ts'),
    },
})
