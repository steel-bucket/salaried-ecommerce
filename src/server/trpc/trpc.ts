import { initTRPC } from '@trpc/server'
import { ExpressContext } from '@/server/server'
import { PayloadRequest } from 'payload/types'
import { User } from '@/config/payload-types'

const t = initTRPC.context<ExpressContext>().create()

const middleware = t.middleware

const isAuthMiddleware = middleware(async ({ ctx, next }) => {
    const req = ctx.req as PayloadRequest
    const { user } = req as { user: User | null }
    if (!user || !user.id) {
        throw new Error('Unauthorized')
    }
    return next({
        ctx: {
            user,
        },
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthMiddleware)
