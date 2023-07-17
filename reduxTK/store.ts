import { configureStore } from '@reduxjs/toolkit'
import productReducer from '@/reduxTK/productSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'



const store = configureStore({
    reducer: {
        products: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 
export const useAppDispatch: () => AppDispatch = useDispatch


export default store

