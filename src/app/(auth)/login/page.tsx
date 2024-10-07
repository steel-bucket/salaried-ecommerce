'use client'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    AuthCredentialsValidator,
    TAuthCredentialsValidator,
} from '@/lib/accountcredvallidator'
import { trpc } from '@/server/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

const Page = () => {
    const searchParams = useSearchParams()
    const isSeller = searchParams.get('as') === 'seller'
    const router = useRouter()
    const origin = searchParams.get('origin')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const { mutate: login, isLoading } = trpc.auth.login.useMutation({
        onSuccess: () => {
            toast.success("Yayyyy...... You're Logged In")
            router.refresh()
            if (origin) {
                router.push(`/${origin}`)
                return
            }
            if (isSeller) {
                router.push('/sell')
                return
            }
            router.push('/')
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                toast.error('Invalid Email or Password')
                return
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }
            toast.error('Something went wrong. Please try again.')
        },
    })

    const onSubmit = (data: TAuthCredentialsValidator) => {
        login(data)
    }

    const ContinueAsCustomer = () => {
        router.replace('/login', undefined)
    }
    const ContinueAsSeller = () => {
        router.push('?as=customer')
    }

    return (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Icons.logo className="h-20 w-20" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Log in to your {isSeller ? 'seller' : ''} Account
                    </h1>
                </div>
                <div className="grid gap-6">
                    <form
                        onSubmit={handleSubmit((data, event) => {
                            event?.preventDefault()
                            onSubmit(data)
                        })}
                    >
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register('email')}
                                    className={cn({
                                        'focus-visible:ring-red-500':
                                            errors.email,
                                    })}
                                    placeholder="you@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register('password')}
                                    type="password"
                                    className={cn({
                                        'focus-visible:ring-red-500':
                                            errors.password,
                                    })}
                                    placeholder="Password"
                                />
                                {errors?.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <Button
                                className="bg-fuchsia-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                <Link
                    className={buttonVariants({
                        variant: 'link',
                        className: 'gap-1.5',
                    })}
                    href="/register"
                >
                    Don&apos;t have an Account, Sign Up
                </Link>

                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                    >
                        <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>
                {isSeller ? (
                    <Button
                        onClick={ContinueAsCustomer}
                        variant="secondary"
                        disabled={isLoading}
                    >
                        Continue as Customer
                    </Button>
                ) : (
                    <Button
                        onClick={ContinueAsSeller}
                        variant="secondary"
                        disabled={isLoading}
                    >
                        Continue as Seller
                    </Button>
                )}
            </div>
        </div>
    )
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default () => (
    <Suspense
        fallback={
            <div>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <div>Loading...</div>
            </div>
        }
    >
        <Page />
    </Suspense>
)
