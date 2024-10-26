'use client'

import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import { Menu, X, LogIn, UserPlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const pathName = usePathname()
    useEffect(() => {
        setIsOpen(false)
    }, [pathName])
    const closeOnCurrent = (href: string) => {
        if (pathName === href) {
            setIsOpen(false)
        }
    }
    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')
    }, [isOpen])

    if (!isOpen)
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300"
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
        )

    return (
        <div>
            <div className="relative z-40 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-75" />
            </div>

            <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
                <div className="w-4/5">
                    <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white dark:bg-black/90 pb-12 shadow-xl">
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mt-2">
                            <ul>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <li
                                        key={category.label}
                                        className="space-y-10 px-4 pb-8 pt-10"
                                    >
                                        <div className="border-b border-gray-200 dark:border-gray-700">
                                            <div className="-mb-px flex">
                                                <p className="border-transparent text-gray-900 dark:text-gray-100 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                                                    {category.label}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                                            {category.featured.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative text-sm"
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="block"
                                                    >
                                                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:opacity-75">
                                                            <Image
                                                                fill
                                                                src={
                                                                    item.imageSrc
                                                                }
                                                                alt={`${item.name} category image`}
                                                                className="object-cover object-center"
                                                            />
                                                        </div>
                                                        <p className="mt-6 block font-medium text-gray-900 dark:text-gray-100">
                                                            {item.name}
                                                        </p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            <div className="flow-root">
                                <Link
                                    onClick={() => closeOnCurrent('/login')}
                                    href="/login"
                                    className="-m-2 block p-2 font-medium text-gray-900 dark:text-gray-100 flex items-center"
                                >
                                    <LogIn className="h-5 w-5 mr-2" />
                                    Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link
                                    onClick={() => closeOnCurrent('/sign-up')}
                                    href="/register"
                                    className="-m-2 block p-2 font-medium text-gray-900 dark:text-gray-100 flex items-center"
                                >
                                    <UserPlus className="h-5 w-5 mr-2" />
                                    Sign up
                                </Link>
                            </div>
                        </div>

                        <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                &copy; 2024 Salaried. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav
