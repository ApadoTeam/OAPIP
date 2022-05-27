import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CommentSlice from "./Slices/CommentSlice";

const Store = configureStore({
  reducer: {
    userInfo: UserInfoSlice,
    comment: CommentSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;