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
import payloadDashboardAnalytics from '@nouance/payload-dashboard-analytics'

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
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
    csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    plugins: [
        payloadDashboardAnalytics({
            provider: {
                source: 'google',
                propertyId: process.env.GOOGLE_PROPERTY_ID || '',
                credentials: process.env.GOOGLE_CREDENTIALS,
            },
            cache: true,
            // access: ({ req }) => Boolean(req?.user.role === 'admin'),
            navigation: {
                afterNavLinks: [
                    { type: 'live' },
                ],
            },
            dashboard: {
                beforeDashboard: ['viewsChart'],
                afterDashboard: ['topPages'],
            },
            globals: [
                {
                    slug: 'homepage',
                    widgets: [
                        {
                            type: 'info',
                            label: 'Homepage Analytics',
                            metrics: ['views', 'sessions', 'sessionDuration'],
                            timeframe: 'currentMonth',
                            idMatcher: () => '/',
                        },
                    ],
                },
            ],
            collections: [
                {
                    // For the Products collection, we want to display a chart with views, visitors, and sessions.
                    slug: Products.slug,
                    widgets: [
                        {
                            type: 'chart',
                            label: 'Product Analytics',
                            metrics: ['views', 'visitors', 'sessions'],
                            timeframe: '30d',
                            // Map the product document to its public page URL.
                            // Adjust the URL pattern to match your NextJS routing (e.g., '/products/[slug]')
                            idMatcher: (document) =>
                                `/products/${document.slug}`,
                        },
                    ],
                },
                {
                    // Optionally, if your Orders collection is connected to a confirmation page or similar public endpoint,
                    // you can include a widget for it.
                    slug: Orders.slug,
                    widgets: [
                        {
                            type: 'info',
                            label: 'Order Analytics',
                            metrics: ['views', 'sessions'],
                            timeframe: '7d',
                            // Use the order's id to map to its confirmation page (adjust as needed)
                            idMatcher: (document) => `/orders/${document.id}`,
                        },
                    ],
                },
            ],
        }),
    ],
})
