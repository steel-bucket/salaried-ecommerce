'use client'

import { Product } from '@/config/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import ProductImageSlider from './ProductImageSlider'

interface ProductlistingProps {
    product: Product | null
    index: number
}

const ProductListing = ({ product, index }: ProductlistingProps) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)

        return () => {
            clearTimeout(timeout)
        }
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />

    const label = PRODUCT_CATEGORIES.find(({ value }) => {
        value === product.category
    })?.label
    // @ts-ignore
    const validURLS = product.images
        .map(({ image }) => (typeof image === 'string' ? image : image.url))
        .filter(Boolean) as string[]

    if (isVisible && product) {
        return (
            <Link
                href={`/product/${product.id}`}
                className={cn(
                    'invisible h-full w-full cursor-pointer group/main',
                    {
                        'visible animate-in fade-in-5': isVisible,
                    }
                )}
            >
                <div className="flex flex-col w-full">
                    <ProductImageSlider urls={validURLS}/>
                    <h3 className="mt-4 font-medium text-sm text-gray-700 dark:text-gray-200">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {label}
                    </p>
                    <p className="mt-1 font-medium text-sm text-gray-900 dark:text-gray-100">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 dark:bg-zinc-600 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
            <Skeleton className="mt-2 w-16  h-4 rounded-lg" />
            <Skeleton className="mt-2 w-12  h-4 rounded-lg" />
        </div>
    )
}

export default ProductListing
