import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animes: [],
};

export const animesSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    setAnimes: (state, action) => {
      state.animes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAnimes } = animesSlice.actions;

export default animesSlice.reducer;
