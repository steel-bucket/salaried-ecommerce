'use client'
import { useEffect, useRef, useState } from 'react'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export default function NavItems() {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null)
            }
        }

        document.addEventListener('keydown', handler)

        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => {
        setActiveIndex(null)
    })

    return (
        <div className={'flex gap-4 h-full'} ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, index) => {
                const handleOpen = () => {
                    if (activeIndex === index) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(index)
                    }
                }
                const isOpen = activeIndex === index

                return (
                    <NavItem
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        key={category.value}
                        isAnyOpen={activeIndex !== null}
                    />
                )
            })}
        </div>
    )
}
