import { publicProcedure, router } from './trpc'
import { authRouter } from './routers/authrouter'
import { z } from 'zod'
import { QueryValidator } from '../../lib/queryvalidator'
import { getPayloadClient } from '../getpayload'

export const appRouter = router({
    auth: authRouter,
    // payment:paymentRouter
    getInfiniteProducts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100),
                cursor: z.number().nullish(),
                query: QueryValidator,
            })
        )
        .query(async ({ input }) => {
            const { query, cursor } = input
            const { sort, limit, ...q } = query

            const payload = await getPayloadClient()

            const parsedQuery: Record<string, { equals: string }> = {}

            Object.entries(q).forEach(([key, value]) => {
                parsedQuery[key] = {
                    equals: value,
                }
            })

            const page = cursor || 1

            const {
                docs: items,
                hasNextPage,
                nextPage,
            } = await payload.find({
                collection: 'products',
                where: {
                    approvedForSale: {
                        equals: 'approved',
                    },
                    ...parsedQuery,
                },
                sort,
                depth: 1,
                limit,
                page,
            })
            return {
                items,
                nextPage: hasNextPage ? nextPage : null,
            }
        }),
})

export type AppRouter = typeof appRouter
