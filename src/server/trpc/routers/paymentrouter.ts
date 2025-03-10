import { z } from 'zod'
import { privateProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../../getpayload'
import { stripe } from '../../../lib/stripe'
import type Stripe from 'stripe'
import { Product } from '@/config/payload-types'

export const paymentrouter = router({
    createSession: privateProcedure
        .input(
            z.object({
                // Now accepts an array of objects with both id and quantity
                productIds: z.array(
                    z.object({
                        id: z.string(),
                        quantity: z.number(),
                    })
                ),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx
            const productIdsWithQuantity = input.productIds

            if (productIdsWithQuantity.length === 0) {
                throw new TRPCError({ code: 'BAD_REQUEST' })
            }

            const payload = await getPayloadClient()

            // Get the unique product IDs
            const uniqueIds = Array.from(
                new Set(productIdsWithQuantity.map((p) => p.id))
            )

            const result = await payload.find({
                collection: 'products',
                where: {
                    id: {
                        in: uniqueIds,
                    },
                },
            })

            const products: Product[] = result.docs.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                price: doc.price,
                category: doc.category,
                productFiles: doc.productFiles,
                priceId: doc.priceId,
                stripeId: doc.stripeId,
                description: doc.description,
                approvedForSale: doc.approvedForSale,
                images: doc.images,
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
            }))

            // Only include products with a valid priceId
            const filteredProducts = products.filter((prod) =>
                Boolean(prod.priceId)
            )

            // Create an order record using unique product IDs (for tracking)
            const order = await payload.create({
                collection: 'orders',
                data: {
                    _isPaid: false,
                    products: filteredProducts.map((prod) => prod.id),
                    user: user.id,
                },
            })

            // Build Stripe line items using the passed quantity values
            const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
                []
            filteredProducts.forEach((product) => {
                const productData = productIdsWithQuantity.find(
                    (p) => p.id === product.id
                )
                const quantity = productData ? productData.quantity : 1
                line_items.push({
                    price: product.priceId!,
                    quantity: quantity,
                })
            })

            // Additional fixed line item (if needed)
            line_items.push({
                price: 'price_1Q66hqP69aOrZAXYZ3k9NobY',
                quantity: 1,
                adjustable_quantity: {
                    enabled: false,
                },
            })

            console.log('Stripe line items:', line_items)

            try {
                const stripeSession = await stripe.checkout.sessions.create({
                    success_url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orderplaced?orderId=${order.id}`,
                    cancel_url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/cart`,
                    payment_method_types: ['card'],
                    mode: 'payment',
                    metadata: {
                        userId: user.id,
                        orderId: order.id,
                    },
                    line_items,
                })

                return { url: stripeSession.url }
            } catch (err) {
                console.log(err)
                return { url: null }
            }
        }),
    pollOrderStatus: privateProcedure
        .input(z.object({ orderId: z.string() }))
        .query(async ({ input }) => {
            const { orderId } = input

            const payload = await getPayloadClient()

            const { docs: orders } = await payload.find({
                collection: 'orders',
                where: {
                    id: {
                        equals: orderId,
                    },
                },
            })

            if (!orders.length) {
                throw new TRPCError({ code: 'NOT_FOUND' })
            }

            const [order] = orders

            return { isPaid: order._isPaid }
        }),
})
