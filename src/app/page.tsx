import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/Products/ProductReel'
import Carousel from '@/components/Carousel'
import { Footer } from '@/components/Footer/Footer'
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
            <div className="mt-40">
                <Footer />
            </div>
        </>
    )
}
