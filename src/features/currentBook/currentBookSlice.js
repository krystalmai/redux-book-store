import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../apiService";

export const loadCurrentBook = createAsyncThunk(
  "currenBook/loadCurrentBook",
  async (bookId) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  }
);

export const addToReadingList = createAsyncThunk(
  "currenBook/addToReadingList",
  async (book) => {
    await api.post(`/favorites`, book);
  }
);

const currentBookSlice = createSlice({
  name: "currentBook",
  initialState: {
    book: {},
    isLoadingBook: false,
    isAddingBook: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentBook.pending, (state) => {
        state.isLoadingBook = true;
      })
      .addCase(loadCurrentBook.fulfilled, (state, action) => {
        state.isLoadingBook = false;
        state.book = action.payload;
      })
      .addCase(loadCurrentBook.rejected, (state, action) => {
        state.isLoadingBook = false;
        state.errorMessage = action.payload.error.message;
      })
      .addCase(addToReadingList.pending, (state) => {
        state.isAddingBook = true;
      })
      .addCase(addToReadingList.fulfilled, (state) => {
        state.isAddingBook = false;
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.payload.error.message);
      });
  },
});

export const selectBook = (state) => state.currentBook.book;
export const selectIsLoadingBook = (state) => state.currentBook.isLoadingBook;
export const selectIsAddingBook = (state) => state.currentBook.isAddingBook;

export default currentBookSlice.reducer;
