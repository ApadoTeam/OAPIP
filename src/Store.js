import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CommentSlice from "./Slices/CommentSlice";
import MapSlice from "./Slices/MapSlice";

// 리덕스 스토어
const Store = configureStore({
  reducer: {
    userInfo: UserInfoSlice,
    comment: CommentSlice, // 댓글 기능 미적용
    map: MapSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;