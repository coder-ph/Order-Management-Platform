// store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Order/orderSlice"; 
import paymentReducer from './Payment/paymentSlice';
import driverStatusReducer from './DriverStatusAvailability/driverStatusAvailabilityReducer';

const rootReducer = {
  order: orderReducer,
  payment: paymentReducer,
  driverStatus: driverStatusReducer
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
