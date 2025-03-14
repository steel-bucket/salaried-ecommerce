import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import { getPayloadClient } from '@/server/getpayload'
import { Product } from '@/config/payload-types'
import { formatPrice } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SortSelect from '@/components/Products/SortSelect'
import { Footer } from '@/components/Footer/Footer'
import AddToCartButton from '@/components/Cart/AddToCartButton'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function CategoryCard({
                                category,
                            }: {
    category: (typeof PRODUCT_CATEGORIES)[0]
}) {
    return (
        <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-102 dark:hover:bg-gray-800 border dark:border-gray-700 group">
            <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.label}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Explore our curated {category.label} range.
                </p>
            </CardHeader>
            <CardContent className="p-0">
                <Link
                    href={`/products?category=${category.value}`}
                    className="block relative aspect-video overflow-hidden group-hover:opacity-95 transition-opacity duration-300"
                >
                    <Image
                        priority
                        src={category.featured[0].imageSrc}
                        alt={`${category.label} category`}
                        fill
                        className="object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-1 bg-gray-50 dark:bg-gray-800 p-4 border-t dark:border-gray-700">
                {category.featured.slice(0, 3).map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300 flex items-center group-hover:underline"
                    >
                        <ChevronRight className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                        {item.name}
                    </Link>
                ))}
                <Link
                    href={`/products?category=${category.value}`}
                    className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                >
                    Explore {category.label}{' '}
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
            </CardFooter>
        </Card>
    )
}

async function ProductCard({ product }: { product: Product }) {
    const imageUrl =
        product.images && product.images[0]?.image
            ? typeof product.images[0].image === 'string'
                ? product.images[0].image
                : product.images[0].image.url
            : '/placeholder.png'

    return (
        <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-102 dark:hover:bg-gray-800 border dark:border-gray-700 flex flex-col justify-between">
            <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 tracking-tight">
                    {product.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
                <Link
                    href={`/product/${product.id}`}
                    className="block aspect-square overflow-hidden group-hover:opacity-95 transition-opacity duration-300"
                >
                    <Image
                        priority
                        // @ts-ignore
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                </Link>
            </CardContent>
            <CardFooter className="flex flex-col bg-gray-50 dark:bg-gray-800 p-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center w-full mb-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm line-through">
                        {formatPrice(product.price + 5)}
                    </span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="w-1/10"></div>
                    <Button className="h-full w-2/5 text-center bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 py-2 px-4 rounded-md font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        <Link href={`/product/${product.id}`}>
                            View Details
                        </Link>
                    </Button>
                    <div className="w-1/5"></div>
                    <AddToCartButton product={product} className={'w-2/5'} />
                    <div className="w-1/10"></div>
                </div>
            </CardFooter>
        </Card>
    )
}

async function getProducts(category?: string, sort?: string, query?: string) {
    const payload = await getPayloadClient()
    let whereOptions = {
        approvedForSale: { equals: 'approved' as const },
    } as any

    if (category) {
        whereOptions.category = { equals: category }
    }

    if (query) {
        whereOptions.name = { contains: query }
    }

    const { docs } = await payload.find({
        collection: 'products',
        where: whereOptions,
        sort:
            sort === 'price-desc'
                ? '-price'
                : sort === 'price-asc'
                    ? 'price'
                    : sort === 'date-desc'
                        ? '-createdAt'
                        : 'createdAt',
    })
    return docs as unknown as Product[]
}

export default async function ProductsPage({ searchParams }: PageProps) {
    // Get URL query params directly from the server-side context.
    const params = await searchParams
    const category = params.category as string | undefined
    const sort = params.sort as string | undefined
    const query = (params.q as string) || ''

    if (sort && !category) {
        notFound()
    }

    const products = await getProducts(category, sort, query)
    const categoryLabel = category
        ? PRODUCT_CATEGORIES.find((cat) => cat.value === category)?.label
        : null

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-500 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-6 py-16 md:py-24">
                {categoryLabel && (
                    <section className="mb-12 md:mb-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {`${categoryLabel} Collection`}
                        </h1>
                        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
                            {`Explore our curated ${categoryLabel} range, featuring items known for their quality and style. Find the perfect addition to your collection.`}
                        </p>
                    </section>
                )}

                {/* Search & Sort Form */}
                {categoryLabel && (
                    <section className="mb-8 md:mb-12">
                        <form
                            method="get"
                            action="/products"
                            className="flex flex-col md:flex-row items-center gap-4"
                        >
                            {/* Preserve category in the query if it exists */}
                            {category && (
                                <input
                                    type="hidden"
                                    name="category"
                                    value={category}
                                />
                            )}
                            <div className="flex-1">
                                <Input
                                    type="search"
                                    name="q"
                                    placeholder="Search products..."
                                    className="w-full dark:bg-gray-800 dark:border-gray-700"
                                    defaultValue={query}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <SortSelect defaultValue={sort} />
                                <Button
                                    type="submit"
                                    className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
                                >
                                    Apply
                                </Button>
                            </div>
                        </form>
                    </section>
                )}
                {!category ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {PRODUCT_CATEGORIES.map((cat) => (
                            <CategoryCard key={cat.value} category={cat} />
                        ))}
                    </section>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </section>
                )}
            </div>
            <Footer />
        </div>
    )
}
