import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const NavAuth = () => {
    const user = null
    return (
        <>
        {user ? null : (
                <Link
                    href="/login"
                    className={buttonVariants({
                        variant: 'ghost',
                    })}
                >
                    Login
                </Link>
            )}


    {user ? null : (
        <span
            className="h-6 w-px bg-gray-200 dark:bg-gray-900"
            aria-hidden="true"
        />
    )}


    {user ? (
        <p></p>
    ) : (
        <Link
            href="/register"
            className={buttonVariants({
                variant: 'ghost',
            })}
        >
            Sign Up
        </Link>
    )}


    {user ? (
        <span
            className="h-6 w-px bg-gray-200"
            aria-hidden="true"
        />
    ) : null}


    {user ? null : (
        <div className="flex lg:ml-6">
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
        </div>
    )}
        </>
    );
}
export default NavAuth