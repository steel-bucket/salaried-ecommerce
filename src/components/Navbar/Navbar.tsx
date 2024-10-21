import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import NavItems from './NavItems'
import Cart from '@/components/Cart/Cart'
import NavAuth from './NavAuth'
import NavThemeButton from './NavThemeButtton'
import MobileMenu from './MobileMenu'

const Navbar = () => {
    return (
        <div className="bg-white dark:bg-black/90 sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white dark:bg-black/90">
                <MaxWidthWrapper
                // className="mx-1"
                >
                    <div className="border-b border-gray-200 dark:border-gray-800">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="flex-shrink-0">
                                    <Icons.logo className="h-8 w-8" />
                                </Link>
                                <div className="hidden md:ml-6 md:flex">
                                    <NavItems />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <NavThemeButton />
                                <div className="hidden md:flex md:items-center md:space-x-4">
                                    <NavAuth />
                                    <div className="ml-4 flow-root">
                                        <Cart />
                                    </div>
                                </div>
                                <div className="flex items-center md:hidden">
                                    <MobileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}

export default Navbar
