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
  async (book, { getState }) => {
    console.log(book.id);

    await api.post(`/favorites`, book);
  }
);

const currentBookSlice = createSlice({
  name: "currentBook",
  initialState: {
    book: undefined,
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
        console.log(state.book.id, state.book.imageLink);
      })
      .addCase(loadCurrentBook.rejected, (state, action) => {
        state.isLoadingBook = false;
        toast.error(action.error.message);
      })
      .addCase(addToReadingList.pending, (state) => {
        state.isAddingBook = true;
      })
      .addCase(addToReadingList.fulfilled, (state) => {
        state.isAddingBook = false;
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.isAddingBook = false;
        toast.error(
          action.error.message === "Error: Insert failed, duplicate id"
            ? "Duplicate book in reading list"
            : action.error.message
        );
      });
  },
});

export const selectBook = (state) => state.currentBook.book;
export const selectIsLoadingBook = (state) => state.currentBook.isLoadingBook;
export const selectIsAddingBook = (state) => state.currentBook.isAddingBook;

export default currentBookSlice.reducer;
