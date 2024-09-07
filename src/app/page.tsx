import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Activity, BadgeCheck, BadgeDollarSign, Truck } from 'lucide-react'
import ProductReel from '@/components/Products/ProductReel'

export default function Home() {
    const perks = [
        {
            title: 'Free Salaried Shipping',
            description: 'We offer salaried shipping on all orders over 10￠',
            Icon: Truck,
        },
        {
            title: '24/7 Salaried Support',
            description: 'We are always here to help the salaried',
            Icon: Activity,
        },
        {
            title: 'Secure Salaried Payments with Salaried Checkout',
            description: 'All payments are Salaried and Salaried',
            Icon: BadgeDollarSign,
        },
        {
            title: 'Salaried Quality Promise',
            description: 'We promise to deliver the best salaried products',
            Icon: BadgeCheck,
        },
        {
            title: 'Poop',
            description: 'poo',
            Icon: BadgeCheck,
        },
    ]
    return (
        <>
            {/* ADD CAROUSEL*/}
            <MaxWidthWrapper>
                <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-600 dark:text-white sm:text-6xl">
                        A High Quality Marketplace iff you are{' '}
                        <span className="text-fuchsia-700">Salaried</span>
                    </h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                        Welcome to Salaried. You are in a totally legitimate
                        platform, we sure are not going to take your money and
                        not give you your product
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Button asChild className="bg-fuchsia-600">
                            <Link href="/products">Browse Products</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/quality">Our Legitimacy Promise</Link>
                        </Button>
                    </div>
                </div>
            </MaxWidthWrapper>
            <MaxWidthWrapper>
                <ProductReel
                    title="New Arrivals"
                    href="/products"
                    query={{
                        limit: 4,
                        sort: 'dsc',
                    }}
                />
            </MaxWidthWrapper>

            <section className="bg-gray-50 dark:bg-black">
                <MaxWidthWrapper className="py-20">
                    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                        {perks.map((perk) => (
                            <div
                                key={perk.title}
                                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                            >
                                <div className="md:flex-shrink-0 flex justify-center">
                                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-900">
                                        <perk.Icon className="h-1/3 w-1/3" />
                                    </div>
                                </div>
                                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-5 lg:ml-0">
                                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                                        {perk.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {perk.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    )
}
