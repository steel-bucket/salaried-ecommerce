'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import NavItems from './NavItems'
import { useTheme } from 'next-themes'
import { buttonVariants } from '@/components/ui/button'
import Cart from '@/components/Cart'
import NavAuth from './NavAuth'

const Navbar = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="bg-white dark:bg-black sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white dark:bg-black">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200 dark:border-gray-900">
                        <div className="flex h-16 items-center">
                            {/* Yet to add Mobile */}
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="h-10 w-10" />
                                </Link>
                            </div>
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}
                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}

                            <div className="ml-auto flex items-center lg:space-x-4">
                                <button
                                    onClick={() => {
                                        setTheme(
                                            theme === 'dark' ? 'light' : 'dark'
                                        )
                                    }}
                                >
                                    <Icons.moon className="h-10 w-10" />
                                </button>
                                {/**/}
                                {/**/}
                                {/**/}
                                {/**/}
                                {/**/}

                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
                                    <NavAuth />
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                                {/**/}
                                {/**/}
                                {/**/}
                                {/**/}
                                {/**/}

                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}
export default Navbar
