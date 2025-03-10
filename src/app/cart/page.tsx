'use client'
import { cn, formatPrice } from '@/lib/utils'
import { CartItemType, useCart } from '@/hooks/useCart'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import { Check, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trpc } from '@/server/trpc/client'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { items, removeItem } = useCart()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Calculate total and fee
    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )
    const fee = 1

    // Build productIds array with quantity information
    let productIds: { id: string; quantity: number }[] = []
    for (const item of items) {
        const existingProduct = productIds.find((p) => p.id === item.product.id)
        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            productIds.push({ id: item.product.id, quantity: 1 })
        }
    }

    // Only used to display a clean list on the frontend (with quantity count)
    function removeDuplicates(items: CartItemType[]): CartItemType[] {
        const uniqueItems: { [key: string]: boolean } = {}
        const result: CartItemType[] = []
        for (const item of items) {
            if (!uniqueItems[item.product.id]) {
                uniqueItems[item.product.id] = true
                result.push(item)
            }
        }
        return result
    }

    const { mutate: createCheckoutSession, isLoading } =
        trpc.payment.createSession.useMutation({
            onSuccess: ({ url }) => {
                console.log('Success ' + url + ' . . . . ')
                if (url) router.push(url)
            },
        })

    return (
        <div className="min-h-screen bg-gradient-to-r from-white to-gray-200 dark:from-gray-800 dark:to-black transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 text-center mb-8">
                    Your Shopping Cart
                </h1>
                <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <div
                        className={cn('lg:col-span-7', {
                            'rounded-lg border-2 p-12 bg-white dark:bg-gray-900':
                                isMounted && items.length === 0,
                        })}
                    >
                        <h2 className="sr-only">Items in your shopping cart</h2>
                        {isMounted && items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <p className="text-xl text-gray-700 dark:text-gray-300">
                                    Your cart is empty
                                </p>
                                <Image
                                    priority
                                    src="/empty-cart.png"
                                    height={100}
                                    width={100}
                                    alt="Empty Cart"
                                    quality={100}
                                    className="opacity-75"
                                />
                            </div>
                        ) : (
                            <ul
                                className={cn({
                                    'divide-y divide-gray-200 dark:divide-gray-800 border-b border-t border-gray-200 dark:border-gray-800':
                                        isMounted && items.length > 0,
                                })}
                            >
                                {isMounted &&
                                    removeDuplicates(items).map(
                                        ({ product }) => {
                                            const label =
                                                PRODUCT_CATEGORIES.find(
                                                    (c) =>
                                                        c.value ===
                                                        product.category
                                                )?.label
                                            // @ts-ignore
                                            const { image } = product.images[0]
                                            const quantity = items.filter(
                                                (x) =>
                                                    x.product?.id ===
                                                    product?.id
                                            ).length
                                            return (
                                                <li
                                                    key={product.id}
                                                    className="flex py-6 sm:py-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg p-4 mb-4"
                                                >
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="flex-shrink-0"
                                                    >
                                                        <div className="relative h-24 w-24 rounded-md overflow-hidden shadow-lg">
                                                            {typeof image !==
                                                                'string' &&
                                                            image.url ? (
                                                                <Image
                                                                    priority
                                                                    fill
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="object-cover object-center"
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </Link>
                                                    <div className="ml-4 flex flex-1 flex-col justify-between">
                                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                            <div>
                                                                <div className="flex justify-between">
                                                                    <h3 className="text-lg font-semibold">
                                                                        <Link
                                                                            href={`/product/${product.id}`}
                                                                            className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 transition-colors"
                                                                        >
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </Link>
                                                                    </h3>
                                                                </div>
                                                                <div className="mt-1 flex text-sm">
                                                                    <p className="text-gray-600 dark:text-gray-400">
                                                                        Category:{' '}
                                                                        {label}
                                                                    </p>
                                                                </div>
                                                                <p className="mt-1 text-md font-medium text-gray-900 dark:text-gray-100">
                                                                    {formatPrice(
                                                                        product.price
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="mt-4 sm:mt-0 sm:pr-9 w-20 relative">
                                                                <Button
                                                                    aria-label="Remove product"
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            product.id
                                                                        )
                                                                    }
                                                                    variant="ghost"
                                                                    className="absolute right-0 top-0"
                                                                >
                                                                    <X
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <Check className="h-5 w-5 text-green-500" />
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    Eligible for
                                                                    instant
                                                                    delivery
                                                                </span>
                                                            </div>
                                                            <div className="mt-2 sm:mt-0 text-sm text-gray-700 dark:text-gray-300">
                                                                Quantity:{' '}
                                                                {quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    )}
                            </ul>
                        )}
                    </div>
                    <section className="mt-16 rounded-lg bg-gray-50 dark:bg-gray-950 px-6 py-8 sm:p-8 lg:col-span-5 lg:mt-0 lg:p-10 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Order Summary
                        </h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Subtotal
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {isMounted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <span>Transaction Fee</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {isMounted ? (
                                        formatPrice(fee)
                                    ) : (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                                    Order Total
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                                    {isMounted ? (
                                        formatPrice(cartTotal + fee)
                                    ) : (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button
                                disabled={items.length === 0 || isLoading}
                                onClick={() => {
                                    console.log(productIds)
                                    createCheckoutSession({ productIds })
                                }}
                                className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                                size="lg"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2 inline-block" />
                                ) : null}
                                Checkout
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Page
