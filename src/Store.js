import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";

const Store = configureStore({
  reducer: {
    login: LoginSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;