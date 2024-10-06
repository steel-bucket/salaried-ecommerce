import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Check, ChevronRight, ShoppingCart } from 'lucide-react'
import { getPayloadClient } from '@/server/getpayload'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { Order, Product } from '@/config/payload-types'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import ProductImageSlider from '@/components/Products/ProductImageSlider'
import ProductReel from '@/components/Products/ProductReel'
import AddToCartButton from '@/components/Cart/AddToCartButton'

interface PageProps {
    params: {
        id: string
    }
}

const BreadCrumbs = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
    const createMarkup = ({ html }: { html: string }) => {
        return { __html: html }
    }
    const { id } = params
    const payload = await getPayloadClient()
    // @ts-ignore
    const { docs: products }: { docs: Array<Product> } = await payload.find({
        collection: 'products',
        limit: 1,
        where: {
            id: {
                equals: id,
            },
            approvedForSale: {
                equals: 'approved',
            },
        },
    })
    const [product] = products

    if (!product) return notFound()

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product?.category
    )?.label

    const validurls = product.images
        ?.map(({ image }) => (typeof image === 'string' ? image : image.url))
        .filter(Boolean) as string[]

    return (
        <MaxWidthWrapper className="bg-white dark:bg-black">
            <div className="bg-white dark:bg-black">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:max-w-lg lg:self-end">
                        <ol className="flex items-center space-x-2">
                            {BreadCrumbs.map((breadcrumb, index) => (
                                <li key={breadcrumb.href}>
                                    <div className="flex items-center text-sm">
                                        <Link
                                            href={breadcrumb.href}
                                            className="font-medium text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
                                        >
                                            {breadcrumb.name}
                                        </Link>
                                        <ChevronRight className="opacity-50 h-4" />
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="flex items-center text-sm">
                                    <div className="font-light text-sm text-muted-foreground">
                                        {label}
                                    </div>
                                </div>
                            </li>
                        </ol>
                        <div className="mt-4 mb-4">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                                {product.name}
                            </h1>
                        </div>
                        <div className="lg:max-w-lg lg:self-end">
                            <div className="aspect-square rounded-lg">
                                <ProductImageSlider urls={validurls} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-semibold text-gray-900 dark:text-gray-200">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                            <div className="mt-4 space-y-6">
                                {typeof product.description === 'string' ? (
                                    <div
                                        className="text-base text-muted-foreground"
                                        dangerouslySetInnerHTML={createMarkup({
                                            html: product.description,
                                        })}
                                    />
                                ) : null}
                            </div>
                            <div className="mt-6 flex items-center">
                                <Check
                                    aria-hidden="true"
                                    className="h-5 w-5 flex-shrink-0 text-green-500"
                                />
                                <p className="ml-2 text-sm text-muted-foreground">
                                    Eligible for instant delivery
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                        <div className="mt-10">
                            <AddToCartButton product={product} />
                        </div>
                        <div className="mt-6 text-center ">
                            <div className="group inline-flex text-sm text">
                                <ShoppingCart
                                    aria-hidden="true"
                                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
                                />
                                <span className="text-muted-foreground hover:text-gray-700">
                                    15 Days for Return or Replacements
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductReel
                href="/products"
                query={{ category: product.category, limit: 10 }}
                title={`Similar products in the ${label} Category`}
                subtitle={`Items similar to '${product.name}'`}
            />
        </MaxWidthWrapper>
    )
}
export default Page
