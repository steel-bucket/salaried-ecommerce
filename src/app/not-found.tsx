import Link from 'next/link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function NotFound() {
    return (
        <MaxWidthWrapper>
            <div className="mx-auto max-w-fit h-full mt-80">
                <h1 className="font-semibold  text-4xl">
                    I&apos;m sorry, that page doesn&apos;t exist</h1>
                <p className="text-lg mt-4">
                    Please contact the developer if you think this is a mistake
                </p>
                <div className="items-center mx-auto max-w-fit mt-8">
                    <Link href="/">Home</Link>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}
