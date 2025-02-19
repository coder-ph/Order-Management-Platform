import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authsSlice";

const rootReducer = {
  auth: authReducer,
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}
export default store
