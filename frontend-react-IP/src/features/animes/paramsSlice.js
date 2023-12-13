import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "",
  status: "",
  order_by: "",
  sort: "",
};

export const animesSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.params = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setParams } = animesSlice.actions;

export default animesSlice.reducer;
