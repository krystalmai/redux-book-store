import { configureStore } from '@reduxjs/toolkit';
import allBooksReducer from '../features/allBooks/allBooksSlice'
import currentBookReducer from '../features/currentBook/currentBookSlice'
import readingListReducer from '../features/readingList/readingListSlice'

export const store = configureStore({
  reducer: {
    allBooks: allBooksReducer,
    currentBook: currentBookReducer,
    readingList: readingListReducer
  },
})