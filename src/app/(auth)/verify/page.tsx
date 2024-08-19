import Image from 'next/image'
import VerifyEmail from '@/components/auth/VerifyEmail'

interface VerifyProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const Verify = ({ searchParams }: VerifyProps) => {
    const token = searchParams.token
    const email = searchParams.email
    return (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                {token && typeof token == 'string' ? (
                    <div className="grid gap-6">
                        <VerifyEmail token={token} />
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <div className="relative mb-4 h-60 w-80 text-muted-foreground">
                            <Image src="/sentemail.png" fill alt="sent email" />
                        </div>
                        <h3 className="font-semibold text-2xl">
                            Check your email
                        </h3>
                        {email ? (
                            <p className="text-muted-foreground text-center">
                                We&apos;ve sent an email to{' '}
                                <span className="font-semibold">{email}</span>.
                                Click the link in the email to verify your email
                                address.
                            </p>
                        ) : (
                            <p className="text-center">
                                We&apos;ve sent an email to your email address.
                                Click the link in the email to verify your email
                                address.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Verify
