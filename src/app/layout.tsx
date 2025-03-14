import type { Metadata } from 'next'
import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import Navbar from '@/components/Navbar/Navbar'
import Providers from '@/components/server/Providers'
import { Toaster } from 'sonner'
import { ReactNode } from 'react'

export const metadata = constructMetadata()


export default async function RootLayout(props: { children: ReactNode; params: Promise<{ id: string }> }) {
    const { children, params } = props;

    const { id } = await params;

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
