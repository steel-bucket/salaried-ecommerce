'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'

const slides = [
    {
        id: 1,
        image: 'waterbottle.avif',
        title: 'Water Bottle',
        description: 'The most awaited water bottle of 2024.',
        buttonText: 'PreOrder water',
        buttonLink: '/products/',
    },
    // {
    //     id: 2,
    //     image: '//www.genesispc.in/cdn/shop/files/bg_banner_product_A75_2x_5e4fccbb-4cc2-48c0-a563-6b23a2a81f25.webp?v=1718031710',
    //     title: 'DrunkDeer Rapid Trigger Keyboards Available!',
    //     description:
    //         'Take your in-game movement to the next level with DrunkDeer Rapid Trigger Keyboards.',
    //     buttonText: 'Check Out',
    //     buttonLink: '/collections/drunkdeer',
    // },
    // {
    //     id: 3,
    //     image: '//www.genesispc.in/cdn/shop/files/GPSvc7QbwAAdBEt.jpg?v=1717602868',
    //     title: 'X-raypad x Teru',
    //     description:
    //         'Newly Launched Cerberus Bundle that Includes Origin Pro Mousepad and Keycaps is up for PreOrder!',
    //     buttonText: 'Check Out',
    //     buttonLink: '/collections/xraypad',
    // },
    // {
    //     id: 4,
    //     image: '//www.genesispc.in/cdn/shop/files/R2-SP-Keycap-SP2.jpg?v=1715264054',
    //     title: 'Akko and Other Custom Keycaps Available!',
    //     description: 'Give yourself a new typing experience',
    //     buttonText: 'Shop Keycaps',
    //     buttonLink: '/collections/keycaps',
    // },
    // {
    //     id: 5,
    //     image: '//www.genesispc.in/cdn/shop/files/robpad_da6bf355-6ceb-45d2-a4a0-7682894eeeab.png?v=1714938641',
    //     title: 'X-raypad Products Available Now!',
    //     description:
    //         'Choose from lineup of high quality mousepads, mouse grips and mouse skates.',
    //     buttonText: 'Shop X-raypad',
    //     buttonLink: '/collections/xraypad',
    // },
]

// @ts-ignore
const CarouselControls = ({ isPlaying, toggleAutoplay }) => {
    return (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-2">
            <CarouselPrevious className="rounded-full bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black" />
            <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
                onClick={toggleAutoplay}
            >
                {isPlaying ? (
                    <Pause className="h-4 w-4" />
                ) : (
                    <Play className="h-4 w-4" />
                )}
            </Button>
            <CarouselNext className="rounded-full bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black" />
        </div>
    )
}

const Component = () => {
    const [isPlaying, setIsPlaying] = React.useState(true)

    const toggleAutoplay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <Carousel
            className="w-full relative"
            opts={{
                loop: true,
                // @ts-ignore
                autoplay: isPlaying ? { delay: 3000 } : false,
            }}
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id}>
                        <div className="relative h-[600px] w-full">
                            <Image
                                src={`/${slide.image}`}
                                alt={slide.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 " />
                            <div className="absolute inset-0 flex flex-col justify-center items-start p-10 text-white ">
                                <h2 className="text-4xl font-bold mb-4">
                                    {slide.title}
                                </h2>
                                <p className="text-xl mb-6">
                                    {slide.description}
                                </p>
                                <Link href={slide.buttonLink}>
                                    <Button
                                        variant="outline"
                                        className="text-black border-white hover:bg-white hover:text-black dark:text-white dark:border-black dark:hover:bg-black dark:hover:text-white"
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselControls
                isPlaying={isPlaying}
                toggleAutoplay={toggleAutoplay}
            />
        </Carousel>
    )
}
export default Component
