'use client'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { MoveUpRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator } from '@/lib/accountcredvallidator'
import { TAuthCredentialsValidator } from '@/lib/accountcredvallidator'

const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const onSubmit = ({email,password}: TAuthCredentialsValidator) => {

    }

    return (
        <>
            <div className="container relative flex flex-col pt-20 items-center justify-center lg:px-0 text-gray-600 dark:text-gray-300">
                <div className="flex flex-col w-full justify-center space-y-6 sm:w-[350px] lg:w-[700px] mx-8">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-52 w-52"></Icons.logo>
                        <h1 className="h1 font-bold text-2xl">Sign Up</h1>

                        <div className="grid gap-6 w-2/3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-2 w-full">
                                    <div className="grid gap-1 py-4 w-full">
                                        <Label htmlFor="email" className="p-3">
                                            {' '}
                                            Email
                                        </Label>
                                        <Input
                                            className={cn({
                                                'focus-visible:ring-fuchsia-500':
                                                    errors.email,
                                            })}
                                            placeholder="salary@salary.com"
                                            {...register('email')}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-2">
                                        <Label htmlFor="password">
                                            {' '}
                                            Password
                                        </Label>
                                        <Input
                                            className={cn({
                                                'focus-visible:ring-fuchsia-500':
                                                    errors.password,
                                            })}
                                            placeholder="password123@"
                                            {...register('password')}
                                        />
                                    </div>
                                    <Button>Sign Up</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link
                        href="signin"
                        className={`${buttonVariants({
                            variant: 'link',
                            size: 'lg',
                        })}`}
                    >
                        Already have an account? Sign in
                        <MoveUpRight className="h-4 w-4 p-0.5" />
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Page
