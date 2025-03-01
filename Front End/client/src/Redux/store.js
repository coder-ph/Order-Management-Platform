// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authsSlice";
import orderReducer from "./Order/orderSlice"; // Import the orderSlice

const rootReducer = {
  auth: authReducer,
  order: orderReducer, // Use "order" as the key
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
