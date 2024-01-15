import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";

export default configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
