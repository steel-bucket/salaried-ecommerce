import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config/webConfig'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
    category: Category
    handleOpen: () => void
    isOpen: boolean
    isAnyOpen: boolean
}

const NavItem = ({ category, handleOpen, isOpen, isAnyOpen }: NavItemProps) => {
    return (
        <div className="relative">
            <Button
                className="w-full md:w-auto justify-between md:justify-center gap-1.5 text-sm"
                onClick={handleOpen}
                variant={isOpen ? 'secondary' : 'ghost'}
            >
                {category.label}
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-all text-muted-foreground',
                        {
                            '-rotate-180': isOpen,
                        }
                    )}
                />
            </Button>

            {isOpen && (
                <div
                    className={cn(
                        'absolute left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-screen max-w-sm md:max-w-2xl text-sm bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden',
                        {
                            'animate-in fade-in-10 slide-in-from-top-5':
                                !isAnyOpen,
                        }
                    )}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {category.featured.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative text-base sm:text-sm rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => handleOpen()}
                            >
                                <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800 group-hover:opacity-75 transition-opacity">
                                    <Image
                                        src={item.imageSrc}
                                        alt={`${item.name} category image`}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="p-2">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {item.name}
                                    </p>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        Shop now
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavItem
