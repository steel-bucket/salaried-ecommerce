import Image from 'next/image'
import { getServerSideUser } from '@/lib/payloadutils'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Order, Product, ProductFile, User } from '@/config/payload-types'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { getPayloadClient } from '@/server/getpayload'
import PaymentStatus from '@/components/Payment/PaymentStatus'

interface OrderPlacedPageProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>
}

export default async function OrderPlacedPage({
    searchParams,
}: OrderPlacedPageProps) {
    const params = await searchParams
    const orderId = params.orderId
    const nextCookies = await cookies()
    const { user } = await getServerSideUser(nextCookies)
    const payload = await getPayloadClient()

    // @ts-ignore
    const { docs: orders }: { docs: Array<Order> } = await payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            id: {
                equals: orderId,
            },
        },
    })
    const [order] = orders
    if (!order || !user || !order.user) {
        return notFound()
    }
    const orderUserId =
        typeof order.user === 'string' ? order.user : order.user.id
    if (orderUserId !== user?.id) {
        return redirect(`/login?origin=orderplaced?orderId=${order.id}`)
    }
    const products = order.products as Product[]

    const orderTotal = products.reduce((total, product) => {
        return total + product.price
    }, 0)

    return (
        <main className="relative lg:min-h-full">
            <div className="h-screen fixed overflow-hidden w-1/2 pr-4 xl:pr-12">
                <Image
                    priority
                    fill
                    src="/checkout.jpg"
                    className="h-full w-full object-cover object-center"
                    alt="thank you for your order"
                />
            </div>

            <div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
                    <div className="lg:col-start-2">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-200">
                            Order successful
                        </p>
                        <h1 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                            Thanks for ordering
                        </h1>
                        {order._isPaid ? (
                            <p className="mt-2 text-base text-muted-foreground">
                                Your order was processed and your assets are
                                available to download below. We&apos;ve sent
                                your receipt and order details to{' '}
                                {typeof order.user !== 'string' ? (
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {order.user.email}
                                    </span>
                                ) : null}
                                .
                            </p>
                        ) : (
                            <p className="mt-2 text-base text-muted-foreground">
                                We appreciate your order, and we&apos;re
                                currently processing it. So hang tight and
                                we&apos;ll send you confirmation very soon!
                            </p>
                        )}

                        <div className="mt-16 text-sm font-medium">
                            <div className="text-muted-foreground">
                                Order nr.
                            </div>
                            <div className="mt-2 text-gray-900 dark:text-gray-100">
                                {order.id}
                            </div>

                            <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800 text-sm font-medium text-muted-foreground">
                                {(order.products as Product[]).map(
                                    (product) => {
                                        const label = PRODUCT_CATEGORIES.find(
                                            ({ value }) =>
                                                value === product.category
                                        )?.label

                                        const downloadUrl = (
                                            product.productFiles as unknown as ProductFile
                                        ).url as string

                                        const image =
                                            product.images && product.images[0]
                                                ? product.images[0].image
                                                : null
                                        return (
                                            <li
                                                key={product.id}
                                                className="flex space-x-6 py-6"
                                            >
                                                <div className="relative h-24 w-24">
                                                    {image &&
                                                    typeof image !== 'string' &&
                                                    image.url ? (
                                                        <Image
                                                            priority
                                                            fill
                                                            src={image.url}
                                                            alt={`${product.name} image`}
                                                            className="flex-none rounded-md bg-gray-100 dark:bg-gray-800 object-cover object-center"
                                                        />
                                                    ) : null}
                                                </div>

                                                <div className="flex-auto flex flex-col justify-between">
                                                    <div className="space-y-1">
                                                        <h3 className="text-gray-900 dark:text-gray-100">
                                                            {product.name}
                                                        </h3>

                                                        <p className="my-1">
                                                            Category: {label}
                                                        </p>
                                                        <p className="my-1">
                                                            Quantity:{' '}
                                                            {
                                                                products.filter(
                                                                    (x) =>
                                                                        x?.id ==
                                                                        product?.id
                                                                ).length
                                                            }
                                                        </p>
                                                    </div>

                                                    {order._isPaid ? (
                                                        <a
                                                            href={downloadUrl}
                                                            download={
                                                                product.name
                                                            }
                                                            className="text-blue-600 dark:text-blue-200 hover:underline underline-offset-2"
                                                        >
                                                            Download asset
                                                        </a>
                                                    ) : null}
                                                </div>

                                                <p className="flex-none font-medium text-gray-900 dark:text-gray-100">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>

                            <div className="space-y-6 border-t border-gray-200 dark:border-gray-800 pt-6 text-sm font-medium text-muted-foreground">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {formatPrice(orderTotal)}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Transaction Fee</p>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {formatPrice(1)}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6 text-gray-900 dark:text-gray-100">
                                    <p className="text-base">Total</p>
                                    <p className="text-base">
                                        {formatPrice(orderTotal + 1)}
                                    </p>
                                </div>
                            </div>

                            <PaymentStatus
                                isPaid={order._isPaid}
                                orderEmail={(order.user as User).email}
                                orderId={order.id}
                            />

                            <div className="mt-16 border-t border-gray-200 dark:border-gray-800 py-6 text-right">
                                <Link
                                    href="/products"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-200 dark:hover:text-blue-100"
                                >
                                    Continue shopping &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
