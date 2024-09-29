'use client'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Page = () => {
    const { items, removeItem } = useCart()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <div className="h-full">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                    Cart Items
                </h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <div
                        className={cn('lg:col-span-7', {
                            'rounded-lg border-2  p-12':
                                isMounted && items.length === 0,
                        })}
                    >
                        <h2 className="sr-only">Items in your shopping cart</h2>
                        {isMounted && items.length === 0 ? (
                            <div>
                                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <p className="text-lg text-muted-foreground">
                                        Your cart is empty
                                    </p>
                                    <Image
                                        src="/empty-cart.png"
                                        height={80}
                                        width={80}
                                        alt="money"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page
