import { z } from 'zod'

export const QueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(['asc', 'dsc']).optional(),
    limit: z.number().min(1).max(100),
})


export type TypeQueryValidator = z.infer<typeof QueryValidator>