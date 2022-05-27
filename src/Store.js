import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import CommentSlice from "./Slices/CommentSlice";

const Store = configureStore({
  reducer: {
    login: LoginSlice,
    comment: CommentSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;