'use client'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { ScrollArea } from '@/components/ui/scroll-area'
import CartItem from '@/components/Cart/CartItem'
import { CartItemType } from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import { Product } from '@/config/payload-types'

const Cart = () => {
    const { items } = useCart()
    const itemCount = items.length
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )

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

    const fee = 1
    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <ShoppingCart
                    className="h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-100
                     group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span
                    className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-100
                    group-hover:text-gray-800"
                >
                    {isMounted ? itemCount : 0}
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Cart({itemCount})</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className="flex w-full flex-col pr-6">
                            <ScrollArea>
                                {removeDuplicates(items).map(({ product }) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                        count={
                                            items.filter(
                                                (x) =>
                                                    x.product?.id == product?.id
                                            ).length
                                        }
                                    />
                                ))}
                            </ScrollArea>
                        </div>
                        <div className="space-y-4 pr-6">
                            <Separator />
                            <div className="space-y-1.5 pr-6">
                                <div className="flex">
                                    <span className="flex-1">Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Transaction Fee
                                    </span>
                                    <span>
                                        {formatPrice(fee, { currency: 'INR' })}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Total</span>
                                    <span>
                                        {formatPrice(cartTotal + fee, {
                                            currency: 'INR',
                                        })}
                                    </span>
                                </div>
                            </div>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <SheetFooter>
                                <SheetTrigger>
                                    <Link
                                        href="/cart"
                                        className={buttonVariants({
                                            className: 'w-full',
                                        })}
                                    >
                                        Proceed to checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col justify-center space-y-1 items-center">
                        <div className="h-60 w-60 relative mb-4 text-muted-foreground">
                            <Image priority src="/empty-cart.png" fill alt="money" />
                        </div>
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            Your cart is empty
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
export default Cart
