"use client";
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

// البدء بحالة فارغة دائماً
const initialState: CartState = {
    items: [],
}

// دالة للحفظ في localStorage
const saveToLocalStorage = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // إضافة reducer لتحميل البيانات من localStorage
        loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        },
        
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
            
            saveToLocalStorage(state.items)
        },

        removeFromCart: (state, action: PayloadAction<{ id: string, size: string, extra: Extra[] }>) => {
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
                existingItem.quantity -= 1
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => {
                        const hasSameExtras = item.extra.length === action.payload.extra.length &&
                            item.extra.every(extra =>
                                action.payload.extra.some(newExtra => newExtra.id === extra.id)
                            )

                        return !(item.id === action.payload.id &&
                            item.size === action.payload.size &&
                            hasSameExtras)
                    })
                }
            }
            
            saveToLocalStorage(state.items)
        },
        
        removeItemFromCart: (state, action: PayloadAction<{ id: string, size: string, extra: Extra[] }>) => {
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
                state.items = state.items.filter(item => {
                    const hasSameExtras = item.extra.length === action.payload.extra.length &&
                        item.extra.every(extra =>
                            action.payload.extra.some(newExtra => newExtra.id === extra.id)
                        )

                    return !(item.id === action.payload.id &&
                        item.size === action.payload.size &&
                        hasSameExtras)
                })
            }
            
            saveToLocalStorage(state.items)
        },
        
        clearCart: (state) => {
            state.items = []
            saveToLocalStorage(state.items)
        }
    },
})

export const { addToCart, removeItemFromCart, removeFromCart, clearCart, loadCartFromStorage } = cartSlice.actions
export default cartSlice.reducer
export const selectCartItems = (state: RootState) => state.cart.items   