import { configureStore } from "@reduxjs/toolkit";
import { authReduce } from "./slices/auth";
import { postsReducer } from "./slices/post";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduce,
  },
});

 export default store;