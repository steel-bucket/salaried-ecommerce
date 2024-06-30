import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@/server/trpc/index'

export const trpc = createTRPCReact<AppRouter>({})
