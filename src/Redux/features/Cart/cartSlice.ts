import { RootState } from '@/Redux/store'
import { createSlice } from '@reduxjs/toolkit'

export type CartItem = {
    id: string
    name: string
    basePrice: number
    image: string
    quantity: number
    size?: string
    extra?: string[]
}
export type CartState = {
    items: CartItem[]
}
const initialState: CartState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
            
    },
})


export default cartSlice.reducer
export const selectCartItems = (state: RootState) => state.cart.items