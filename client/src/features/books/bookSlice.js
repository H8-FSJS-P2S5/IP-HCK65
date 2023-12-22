import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books : []
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload
    }
  }
})

export const { setBooks  } = bookSlice.actions

export default bookSlice.reducer