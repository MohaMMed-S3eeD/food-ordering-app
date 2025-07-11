import { configureStore } from '@reduxjs/toolkit'
import { Environments } from '@/constants/enums'
import cartReducer from './features/Cart/cartSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== Environments.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch