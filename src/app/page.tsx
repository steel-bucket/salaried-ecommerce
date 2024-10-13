import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Activity, BadgeCheck, BadgeDollarSign, Truck } from 'lucide-react'
import ProductReel from '@/components/Products/ProductReel'
import Carousel from '@/components/Carousel'
export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <Carousel />
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

        </>
    )
}
