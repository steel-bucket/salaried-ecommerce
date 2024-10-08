import { Product } from '@/config/payload-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItemType = {
    product: Product
}
type CartState = {
    items: CartItemType[]
    addItem: (product: Product) => void
    removeItem: (id: string) => void
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) =>
                set((state) => {
                    return { items: [...state.items, { product }] }
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== id),
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cartStorage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)