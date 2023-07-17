import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface InitialStateType {
    cartItems: Product[]
}

const initialState: InitialStateType = {
    cartItems: []
}


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        AddToCart: (state, { payload }: PayloadAction<Product>) => {
            state.cartItems = [{...payload, amount: 1}, ...state.cartItems]
        },

        RemoveFromCart: (state, { payload }: PayloadAction<{id: number}>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload.id)
        },

        IncreaseAmount: (state, { payload }:PayloadAction<{id: number}>) => {
            state.cartItems = state.cartItems.map(item => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        amount: item.amount + 1
                    }
                }
                return item
            })
        },

        DecreaseAmount: (state, { payload }:PayloadAction<{id: number}>) => {
            state.cartItems = state.cartItems.map(item => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        amount: item.amount > 1 ? item.amount - 1 : 1 
                    }
                }
                return item
            })
        }

    }
})

export const { AddToCart, RemoveFromCart, IncreaseAmount, DecreaseAmount } = productSlice.actions
export default productSlice.reducer