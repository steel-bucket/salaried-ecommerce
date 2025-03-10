import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/Products/ProductReel'
import Carousel from '@/components/Carousel'
import { Footer } from '@/components/Footer/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ContactSection from '@/components/ContactSection'

function HeroSection() {
    return (
        <section
            className="relative bg-cover bg-center h-[600px] md:h-[700px] lg:h-[800px]"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-xl">
                    Shop the Best Water Bottles & Keyboards
                </h1>
                <p className="mt-4 text-lg md:text-2xl text-gray-300">
                    Stay hydrated and type in style with our premium selection.
                </p>
                <div className="mt-8">
                    <Link
                        href="/products"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

function FeaturedSection() {
    return (
        <section className="py-16 bg-gray-100 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Featured Items
                    </h2>
                    <Link
                        href="/products"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        View All Featured Products →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-black shadow rounded-lg overflow-hidden transition-colors">
                        <Image
                            priority
                            src="/nav/waterBottles/img.png"
                            alt="Featured Water Bottle"
                            width={500}
                            height={300}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                HydroGlide Stainless Steel Bottle
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Keep your drinks cold or hot for hours with our
                                top-tier design.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/product/677d63c61bb6692afd43c3a0"
                                    className="text-blue-600 hover:underline"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Keyboard */}
                    <div className="bg-white dark:bg-black shadow rounded-lg overflow-hidden transition-colors">
                        <Image
                            priority
                            src="/nav/keyboards/img.png"
                            alt="Featured Keyboard"
                            width={500}
                            height={300}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                TypeEdge ZK-500 Ergonomic Keyboard
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Experience precision and comfort with
                                customizable lights.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/product/677d87d81af12353593c252d"
                                    className="text-blue-600 hover:underline"
                                >
                                    Discover More →
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-black shadow rounded-lg overflow-hidden transition-colors">
                        <Image
                            priority
                            src="/nav/mice/img.png"
                            alt="Featured Mouse"
                            width={500}
                            height={300}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                ProTrack T600 Vertical Mouse
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Ultra-smooth performance for everyday use or
                                gaming.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/product/677d8c591af12353593c2a7f"
                                    className="text-blue-600 hover:underline"
                                >
                                    See Details →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function PromoSection() {
    return (
        <section className="py-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg transition-colors">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Summer Hydration Sale
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Refreshing discounts on our top water bottles.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/products?category=waterBottles"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                        <Image
                            priority
                            src="/nav/waterBottles/img_1.png"
                            alt="Summer Sale"
                            width={600}
                            height={400}
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg transition-colors">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                New Keyboard Models
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Explore our latest mechanical and membrane
                                keyboards.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/products?category=keyboards"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Explore Now
                                </Link>
                            </div>
                        </div>
                        <Image
                            priority
                            src="/nav/keyboards/img_2.png"
                            alt="New Components"
                            width={600}
                            height={400}
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

function TestimonialSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
                    What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            "I love my new insulated water bottle! It keeps my
                            drinks cold all day, even in the summer heat."
                        </p>
                        <div className="flex items-center">
                            <Image
                                priority
                                src="/nav/waterBottles/img_1.png"
                                alt="User 1"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-gray-800 dark:text-white font-bold">
                                    Sarah D.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Verified Buyer
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            "The mechanical keyboard I got is a game-changer!
                            Typing feels so satisfying."
                        </p>
                        <div className="flex items-center">
                            <Image
                                priority
                                src="/nav/keyboards/img_1.png"
                                alt="User 2"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-gray-800 dark:text-white font-bold">
                                    Justin W.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Tech Enthusiast
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            "Fast shipping and great prices. I got both a water
                            bottle and a keyboard—both are top notch."
                        </p>
                        <div className="flex items-center">
                            <Image
                                priority
                                src="/nav/keyboards/img_2.png"
                                alt="User 3"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-gray-800 dark:text-white font-bold">
                                    Daniel K.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Avid Gamer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// function BlogSection() { //TODO
//     return (
//         <section className="py-16 bg-white dark:bg-black transition-colors">
//             <div className="max-w-7xl mx-auto px-4">
//                 <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//                         Latest From Our Blog
//                     </h2>
//                     <Link
//                         href="/blog"
//                         className="text-blue-600 hover:underline text-sm font-medium"
//                     >
//                         Read All Posts →
//                     </Link>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="bg-gray-50 dark:bg-black rounded-lg overflow-hidden shadow transition-colors">
//                         <Image
//                             src="/nav/waterBottles/img_2.png"
//                             alt="Blog Post 1"
//                             width={600}
//                             height={350}
//                             className="w-full object-cover"
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//                                 Staying Hydrated 24/7
//                             </h3>
//                             <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                                 Tips for keeping your water intake top-notch.
//                             </p>
//                             <div className="mt-4">
//                                 <Link
//                                     href="/blog/post-1"
//                                     className="text-blue-600 hover:underline text-sm"
//                                 >
//                                     Read More →
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-50 dark:bg-black rounded-lg overflow-hidden shadow transition-colors">
//                         <Image
//                             src="/nav/keyboards/img_2.png"
//                             alt="Blog Post 2"
//                             width={600}
//                             height={350}
//                             className="w-full object-cover"
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//                                 Keyboard Buying Guide
//                             </h3>
//                             <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                                 Everything you need to know before picking the
//                                 right keyboard.
//                             </p>
//                             <div className="mt-4">
//                                 <Link
//                                     href="/blog/post-2"
//                                     className="text-blue-600 hover:underline text-sm"
//                                 >
//                                     Read More →
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-50 dark:bg-black rounded-lg overflow-hidden shadow transition-colors">
//                         <Image
//                             src="/nav/mice/img_2.png"
//                             alt="Blog Post 3"
//                             width={600}
//                             height={350}
//                             className="w-full object-cover"
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//                                 Choosing the Perfect Mouse
//                             </h3>
//                             <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                                 A quick guide to comfort, design, and
//                                 performance.
//                             </p>
//                             <div className="mt-4">
//                                 <Link
//                                     href="/blog/post-3"
//                                     className="text-blue-600 hover:underline text-sm"
//                                 >
//                                     Read More →
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

function NewsletterSection() {
    return (
        <section className="py-16 bg-gray-900 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white">
                    Join Our Newsletter
                </h2>
                <p className="mt-4 text-gray-300">
                    Get the latest updates, exclusive offers, and tips on
                    hydration & ergonomics.
                </p>
                <form className="mt-8 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row items-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            type="submit"
                            className="mt-4 sm:mt-0 sm:ml-2 px-6 py-3 bg-blue-600 text-white rounded sm:rounded-l-none hover:bg-blue-700 transition-colors"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}


function ExtraContent() {
    return (
        <section className="py-12 bg-gray-100 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    More About Our Services
                </h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Product Consultation
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Our experts will guide you in choosing items that
                            fit your lifestyle.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            After-Sales Support
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            We offer top-notch support for any issues or queries
                            post-purchase.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Warranty &amp; Repairs
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            All our products include a reliable warranty for
                            peace of mind.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Financing Options
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Easy payment plans available for your convenience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    return (
        <>
            <HeroSection />

            <MaxWidthWrapper>
                <section className="mt-12">
                    <Carousel />
                </section>
                <section className="mt-16">
                    <ProductReel
                        title="New Arrivals"
                        href="/products"
                        query={{
                            limit: 8,
                            sort: 'dsc',
                        }}
                    />
                </section>
                <section className="mt-16">
                    <ProductReel
                        title="Best Sellers"
                        href="/products?category=keyboards"
                        query={{
                            limit: 4,
                            sort: 'asc',
                        }}
                    />
                </section>

                <section className="mt-16">
                    <FeaturedSection />
                </section>

                <section className="mt-16">
                    <TestimonialSection />
                </section>

                <section className="mt-16">
                    <ContactSection />
                </section>

                {/*<section className="mt-16">*/}
                {/*    <ExtraContent />*/}
                {/*</section>*/}

                <section className="mt-16">
                    <PromoSection />
                </section>

                <section className="mt-16">
                    <NewsletterSection />
                    <br/>
                </section>
            </MaxWidthWrapper>
            <Footer />
        </>
    )
}
