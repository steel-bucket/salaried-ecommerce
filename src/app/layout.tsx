import type { Metadata } from 'next'
import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import Navbar from '@/components/Navbar/Navbar'
import Providers from '@/components/server/Providers'
import { Toaster } from 'sonner'

export const metadata = constructMetadata()


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
            <body className={cn('relative h-full antialiased')}>
                <Providers>
                    <Navbar />
                    <main className={cn('relative flex flex-col min-h-max')}>
                        <div className={cn('flex-grow flex-1')}>{children}</div>
                    </main>
                </Providers>
                <Toaster position="top-center" richColors />
            </body>
        </html>
    )
}
