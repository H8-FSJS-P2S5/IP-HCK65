import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/search/searchSlice'
import booksReducer from './features/books/bookSlice'

export const store = configureStore({
  reducer: {
    search : searchReducer,
    books : booksReducer
  },
})

