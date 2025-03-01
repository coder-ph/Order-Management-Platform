// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authsSlice";
import orderReducer from "./Order/orderSlice"; 
import paymentReducer from './Payment/paymentSlice'

const rootReducer = {
  auth: authReducer,
  order: orderReducer,
  payment: paymentReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
