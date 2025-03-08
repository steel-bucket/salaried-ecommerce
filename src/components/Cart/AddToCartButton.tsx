'use client'
import { Product } from '@/config/payload-types'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const AddToCartButton = ({
    product,
    className,
}: {
    product: Product
    className: string
}) => {
    const { addItem } = useCart()
    const [success, setSuccess] = useState<boolean>(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccess(false)
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [success])
    return (
        <Button
            onClick={() => {
                addItem(product)
                setSuccess(true)
            }}
            size="lg"
            className={cn(
                className,
                success ? 'bg-green-600' : 'bg-blue-600',
                // 'w-full'
            )}
        >
            {success ? 'Success' : 'Add to Cart'}
        </Button>
    )
}

export default AddToCartButton
