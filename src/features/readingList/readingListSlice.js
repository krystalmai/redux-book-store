import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";
export const loadReadingList = createAsyncThunk(
  "readingList/loadReadingList",
  async () => {
    const res = await api.get(`/favorites`);
    console.log(res.data);
    return res.data;
  }
);
export const removeFromReadingList = createAsyncThunk(
  "readingList/removeFromReadingList",
  async (bookId, { getState }) => {
    await api.delete(`/favorites/${bookId}`);
  }
);

const readingListSlice = createSlice({
  name: "readingList",
  initialState: {
    favoriteBooks: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReadingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadReadingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteBooks = action.payload;
        state.shouldRender = false;
      })
      .addCase(loadReadingList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromReadingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromReadingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteBooks = state.favoriteBooks.filter(
          (book) => book.id !== action.meta.arg
        );
        toast.success("The book has been removed");
        state.shouldRender = true;
      })
      .addCase(removeFromReadingList.rejected, (state) => {
        state.isLoading = false;
        toast.error("There's an error");
      });
  },
});

export const selectFavoriteBooks = (state) => state.readingList.favoriteBooks;
export const selectIsLoading = (state) => state.readingList.isLoading;

export default readingListSlice.reducer;
