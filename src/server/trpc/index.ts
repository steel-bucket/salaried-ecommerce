import { publicProcedure, router } from './trpc'
import { authRouter } from './routers/authrouter'

export const appRouter = router({
    auth: authRouter,
    // payment:paymentRouter
})

export type AppRouter = typeof appRouter
