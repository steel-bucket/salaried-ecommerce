import { publicProcedure, router } from './trpc'
import { authRouter } from './routers/authrouter'

export const appRouter = router({
    auth: authRouter,

    // testAPIRouter: publicProcedure.query(() => {
    //     return 'Hello World'
    // }),

    // payment:paymentRouter
})

export type AppRouter = typeof appRouter
