import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    collections: [],
    routes: {
        'admin': '/sell',
    },
    admin:{
        bundler: webpackBundler(),
        meta: {
            titleSuffix: 'Salaried',
            favicon: '/wallet.svg',
            // ogImage: '/wallet.svg',
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db:mongooseAdapter({
        url: process.env.MONGO_URL!,
    })
})
