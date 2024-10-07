import express from 'express'
import { nextApp, nextHandler } from './next-utils'
import { getPayloadClient } from './getpayload'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'
// @ts-ignore
import bodyParser from 'body-parser'
import { IncomingMessage } from 'node:http'
import { stripeWebhookHandler } from './webhooks'

const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

export type WebhookRequest = IncomingMessage & {rawBody: Buffer}

const start = async () => {
    const webhookMiddleware = bodyParser.json({
        verify: (req: WebhookRequest, _: any, buffer: Buffer) => {
            req.rawBody = buffer
        },
    })

    app.post(
        '/api/webhooks/stripe',
        webhookMiddleware,
        stripeWebhookHandler
    )

    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
            },
        },
    })
    app.use(
        '/api/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    )
    app.use((req, res) => nextHandler(req, res))
    nextApp.prepare().then(() => {
        payload.logger.info(
            `hahaha server is running on http://localhost:${PORT}`
        )
        app.listen(PORT, async () => {
            payload.logger.info(
                `Next JS server URL ${process.env.NEXT_PUBLIC_SERVER_URL}`
            )
        })
    })
}
start()
