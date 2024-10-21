'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import NavItems from './NavItems'
import Cart from '@/components/Cart/Cart'

const MobileMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
            </Button>

            {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 shadow-lg">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <NavItems />
                        <div className="mt-4">
                            <Cart />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileMenu
