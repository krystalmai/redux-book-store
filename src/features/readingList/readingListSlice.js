import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";
export const loadReadingList = createAsyncThunk(
  'readingList/loadReadingList', 
  async () => {
    const res = await api.get(`/favorites`);
    return res.data
  }
)
export const removeFromReadingList = createAsyncThunk(
  'readingList/removeFromReadingList', 
  async (bookId) => {
    await api.delete(`/favorites/${bookId}`);
  }
)

const readingListSlice = createSlice({
  name: 'readingList',
  initialState: {
    favoriteBooks: {},
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReadingList.pending, (state) => {
      state.isLoading = true
    })
      .addCase(loadReadingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteBooks = action.payload
    })
      .addCase(loadReadingList.rejected, (state, action) => {
        toast(action.payload);

    })
      .addCase(removeFromReadingList.pending, (state) => {
      state.isLoading = true
    })
      .addCase(removeFromReadingList.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("The book has been removed")
    })
      .addCase(removeFromReadingList.rejected, (state, action) => {
        toast(action.payload.error.message);

    })
  }
}
)

export const selectFavoriteBooks = state => state.favoriteBooks;
export const selectIsLoading = state => state.isLoading;

export default readingListSlice.reducer;