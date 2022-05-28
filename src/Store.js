import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CommentSlice from "./Slices/CommentSlice";
import MapSlice from "./Slices/MapSlice";

const Store = configureStore({
  reducer: {
    userInfo: UserInfoSlice,
    comment: CommentSlice,
    map: MapSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;