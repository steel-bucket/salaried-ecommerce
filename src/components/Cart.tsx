'use client'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Cart = () => {
    const itemCount = 0;
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
                    0
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Cart(0)</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                    <div className="flex w-full flex-col pr-6">
                        cart items
                    </div>
                        <div className="space-y-4 pr-6">
                            <Separator/>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Your cart is empty
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
export default Cart
