import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(
    price: number | string,
    options: {
        currency?:
            | 'USD'
            | 'EUR'
            | 'GBP'
            | 'JPY'
            | 'CNY'
            | 'KRW'
            | 'INR'
            | 'TRY'
            | 'BRL'
            | 'CAD'
            | 'AUD'
            | 'MXN'
            | 'IDR'
            | 'CHF'
            | 'PHP'
            | 'MYR'
            | 'ZAR'
            | 'SEK'
            | 'NOK'
            | 'DKK'
            | 'CZK'
            | 'HUF'
            | 'PLN'
            | 'THB'
            | 'NZD'
            | 'SGD'
            | 'HKD'
            | 'ILS'
            | 'CLP'
            | 'TWD'
            | 'ARS'
            | 'COP'
            | 'AED'
            | 'SAR'
            | 'EGP'
            | 'KWD'
            | 'QAR'
            | 'OMR'
            | 'BHD'
            | 'JOD'
            | 'LBP'
            | 'PKR'
            | 'NGN'
            | 'KES'
            | 'UGX'
            | 'GHS'
            | 'ZMW'
            | 'ZWL'
            | 'TZS'
            | 'MAD'
            | 'DZD'
            | 'TND'
            | 'MZN'
            | 'AOA'
            | 'XAF'
            | 'XOF'
            | 'XAF BEAC'
            | 'XOF BCEAO'
            | 'XOF UEMOA'
            | 'XOF WAMU'
            | 'XOF WAMZ'
            | 'XOF WAFU'
        notation?: Intl.NumberFormatOptions['notation']
    } = {}
) {
    // const { currency = 'USD', notation = 'standard' } = options
    const { currency = 'INR', notation = 'standard' } = options
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation,
    }).format(numericPrice)
}

export function constructMetadata({
    title = 'Salaried - the marketplace for digital assets',
    description = 'Salaried is an open-source marketplace for high-quality digital goods.',
    image = '/thumbnail.png',
    icons = '/favicon.ico',
    noIndex = false,
}: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        icons,
        metadataBase: new URL('https://yettobeupdated.com'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
