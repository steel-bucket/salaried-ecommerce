"use client"
import { Product } from '@/config/payload-types'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

const AddToCartButton = ({ product }: { product: Product }) => {
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
            className="w-full"
        >
            {success ? 'Success' : 'Add to Cart'}
        </Button>
    )
}

export default AddToCartButton
