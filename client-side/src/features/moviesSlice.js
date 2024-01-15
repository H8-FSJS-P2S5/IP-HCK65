import { createSlice } from "@reduxjs/toolkit";
// import { fetchDetailMovie } from "./actions";

// import { useDispatch } from "react-redux";

const initialState = {
    movies : []
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovieList } = moviesSlice.actions;
export default moviesSlice.reducer

