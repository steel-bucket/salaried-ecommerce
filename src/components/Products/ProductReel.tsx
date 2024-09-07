'use client'
import Link from 'next/link'
import { trpc } from '@/server/trpc/client'
import { TypeQueryValidator } from '../../lib/queryvalidator'
import { Product } from '../../config/payload-types'
import ProductListing from './ProductListing'

interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TypeQueryValidator
}

const ProductReel = (props: ProductReelProps) => {
    const { title, subtitle, href, query } = props

    const FALLBACKLIMIT = 4
    const { data: queryRes, isLoading } =
        trpc.getInfiniteProducts.useInfiniteQuery(
            {
                limit: query.limit ?? FALLBACKLIMIT,
                query,
            },
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        )

    const products = queryRes?.pages.flatMap((page) => page.items)

    let mpp: (Product | null)[] = []
    if (products && products.length) {
        // @ts-ignore
        mpp = products
    } else if (isLoading) {
        mpp = new Array<null>(query.limit ?? FALLBACKLIMIT).fill(null)
    }

    return (
        <>
            <section className="py-12">
                <div className="md:flex md:items-center md:justify-between mb-4">
                    <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                        {title ? (
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl">
                                {title}
                            </h1>
                        ) : null}
                        {subtitle ? (
                            <p className="mt-2 text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        ) : null}
                    </div>

                    {href ? (
                        <Link
                            href={href}
                            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
                        >
                            Shop the collection{' '}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    ) : null}
                </div>
                <div className="relative">
                    <div className="mt-6 flex items-center w-full">
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                            {mpp.map((product, index) => (
                                <ProductListing
                                    product={product}
                                    index={index}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductReel
