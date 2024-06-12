"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import NavItems from '@/components/NavItems'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const router = useRouter()

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const initialTheme = localStorage.getItem('darkMode')
        setIsDarkMode(initialTheme === 'true')
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () =>
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }, [])

    const handleSystemThemeChange = () => {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches
        setIsDarkMode(prefersDark)
        toggleDarkMode(prefersDark)
    }

    const toggleDarkMode = (
        newDarkMode: boolean | ((prevState: boolean) => boolean)
    ) => {
        setIsDarkMode(newDarkMode)
        localStorage.setItem('darkMode', newDarkMode.toString())
        // onClick(newDarkMode)
    }

    return (
        <div className="bg-white dark:bg-black sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white dark:bg-black">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200 dark:border-gray-900">
                        <div className="flex h-16 items-center">
                            {/* Yet to add Mobile */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="h-10 w-10" />
                                </Link>
                            </div>
                            {/*<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">*/}
                            {/*    <NavItems />*/}
                            {/*</div>*/}


                            {/*<div className="ml-4 flex lg:ml-0">*/}
                            {/*    <button onClick={*/}
                            {/*        () => {*/}
                            {/*            toggleDarkMode(!isDarkMode)*/}
                            {/*        }*/}
                            {/*    }>*/}
                            {/*        <Icons.moon className="h-10 w-10" />*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}
export default Navbar
