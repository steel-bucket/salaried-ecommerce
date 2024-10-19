import { Metadata } from 'next'
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

export const metadata: Metadata = {
    title: 'Products | Our Collections',
    description: 'Explore our diverse range of product collections',
}

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const category = searchParams.category as string | undefined
    const sort = searchParams.sort as string | undefined

    if (sort && !category) {
        notFound()
    }

    const payload = await getPayloadClient()

    let products: Product[] = []

    if (category) {
        const { docs } = await payload.find({
            collection: 'products',
            where: {
                category: {
                    equals: category,
                },
                approvedForSale: {
                    equals: 'approved',
                },
            },
            sort: sort === 'desc' ? '-createdAt' : 'createdAt',
        })
        products = docs as unknown as Product[]
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black/5 to-white dark:from-black/90 dark:to-black/80">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold mb-8 text-center text-black dark:text-white tracking-tight">
                    {category
                        ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
                        : 'Our Collections'}
                </h1>
                <p className="text-center text-black/60 dark:text-white/60 mb-12 max-w-2xl mx-auto">
                    Discover our curated selection of unique and high-quality products.
                    Each item is carefully chosen to bring style and functionality to your life.
                </p>

                {!category ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCT_CATEGORIES.map((category) => (
                            <Card
                                key={category.value}
                                className="overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-black/20 group"
                            >
                                <CardHeader className="p-4">
                                    <CardTitle className="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {category.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={category.featured[0].imageSrc}
                                            alt={`${category.label} category`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start space-y-2 bg-black/5 dark:bg-black/30 p-4">
                                    {category.featured.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-sm text-black/70 hover:text-blue-600 dark:text-white/70 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                                        >
                                            <ChevronRight className="h-4 w-4 mr-1" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                className="overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-black/20 flex flex-col"
                            >
                                <CardHeader className="p-4">
                                    <CardTitle className="text-xl font-semibold text-black dark:text-white line-clamp-1">
                                        {product.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <div className="relative aspect-square">
                                        <Image
                                            // @ts-ignore
                                            src={
                                                product.images &&
                                                product.images[0]?.image
                                                    ? typeof product.images[0]
                                                        .image === 'string'
                                                        ? product.images[0].image
                                                        : product.images[0].image
                                                            .url
                                                    : '/placeholder.png'
                                            }
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center bg-black/5 dark:bg-black/30 p-4">
                                    <span className="text-lg font-bold text-black dark:text-white">
                                        {formatPrice(product.price)}
                                    </span>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 py-2 px-4 rounded transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}