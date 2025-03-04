// store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Order/orderSlice"; 
import paymentReducer from './Payment/paymentSlice'

const rootReducer = {
  order: orderReducer,
  payment: paymentReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
