import { RootState } from '@/Redux/store'
import { Extra } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
    id: string
    name: string
    basePrice: number
    image: string
    quantity: number
    size: string
    extra: Extra[]
}
export type CartState = {
    items: CartItem[]
}
const initialState: CartState = {
    items: [

    ],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => {
                const hasSameExtras = item.extra.length === action.payload.extra.length && 
                    item.extra.every(extra => 
                        action.payload.extra.some(newExtra => newExtra.id === extra.id)
                    )
                
                return item.id === action.payload.id && 
                       item.size === action.payload.size && 
                       hasSameExtras
            })
            
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }
        },
      
        removeFromCart: (state, action: PayloadAction<{ id: string, size: string, extra: Extra[] }>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.extra.every(extra => action.payload.extra.includes(extra)))
            if (existingItem) {
                existingItem.quantity -= 1
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== action.payload.id)
                }
            }
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        }
    },
})

export const { addToCart, removeItemFromCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
export const selectCartItems = (state: RootState) => state.cart.items   