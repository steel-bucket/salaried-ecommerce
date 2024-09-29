'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'

import type SwiperType from 'swiper'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Pagination } from 'swiper/modules'

const ProductImageSlider = ({ urls }: { urls: string[] }) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
    })

    useEffect(() => {
        if (swiper) {
            swiper.on('slideChange', ({ activeIndex }) => {
                setActiveIndex(swiper.activeIndex)
                setSlideConfig({
                    isBeginning: activeIndex === 0,
                    isEnd: activeIndex === (urls.length ?? 0) - 1,
                })
            })
        }
    }, [swiper, urls])

    const activeStyles =
        'active:scale-[0.97] grid opacity-100 hover:scale-105 ' +
        'absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 ' +
        'z-50 place-items-center rounded-full border-2 bg-white ' +
        'dark:bg-gray-900 shadow-md border-zinc-300'
    const inactiveStyles = 'hidden text-gray-400 dark:text-gray-500'

    return (
        <div className="group relative bg-zinc-100 dark:bg-zinc-800 aspect-square overflow-hidden rounded-xl">
            <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slideNext()
                    }}
                    className={cn(activeStyles, 'right-3 transition', {
                        [inactiveStyles]: slideConfig.isEnd,
                        'hover:bg-primary-300 dark:hover:bg-primary-100 text-primary-800  dark:text-primary-200 opacity-100':
                            !slideConfig.isEnd,
                    })}
                    aria-label={'Next'}
                >
                    <ChevronRight className="h-4 w-4 text-zinc-700 dark:text-zinc-100" />{' '}
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slidePrev()
                    }}
                    className={cn(activeStyles, 'left-3 transition', {
                        [inactiveStyles]: slideConfig.isBeginning,
                        'hover:bg-primary-300 dark:hover:bg-primary-400 text-primary-800  dark:text-primary-900 opacity-100':
                            !slideConfig.isBeginning,
                    })}
                    aria-label={'Prev'}
                >
                    <ChevronLeft className="h-4 w-4 text-zinc-700 dark:text-zinc-100" />{' '}
                </button>
            </div>
            <Swiper
                className="w-full h-full"
                onSwiper={(swiper) => setSwiper(swiper)}
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition ${className}"></span>`
                    },
                }}
            >
                {urls.map((url, index) => (
                    <SwiperSlide key={index} className="-z-10 h-full w-full">
                        <Image
                            fill
                            loading="eager"
                            className="-z-10 h-full w-full object-cover object-center"
                            src={url}
                            alt={`Product Image ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default ProductImageSlider
