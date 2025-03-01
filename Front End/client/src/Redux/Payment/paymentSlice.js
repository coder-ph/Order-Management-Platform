import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    isPaymentConfirmed: false,
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        confirmPayment: (state) => {
            state.isPaymentConfirmed = true
        },
        resetPayment: (state) =>{
            state.isPaymentConfirmed = false
        }
    }
})
export const {confirmPayment, resetPayment} = paymentSlice.actions
export default paymentSlice.reducer