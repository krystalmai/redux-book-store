import api from "../../apiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loadAllBooks = createAsyncThunk(
  "allBooks/loadAllBooks",
  async (arg, { getState }) => {
    const state = getState();
    let url = `/books?_page=${state.allBooks.pageNum}&_limit=${state.allBooks.limit}`;
    if (state.allBooks.searchQuery) url += `&q=${state.allBooks.searchQuery}`;
    console.log(url);
    const res = await api.get(url);
    return res.data;
  }
);

export const allBooksSlice = createSlice({
  name: "allBooks",
  initialState: {
    books: null,
    searchQuery: null,
    totalPage: 10,
    limit: 10,
    pageNum: 1,
    isLoading: true,
  },
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
      state.isLoading = true;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchQuery = null;
        state.books = action.payload;
      })
      .addCase(loadAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.error.message);
      });
  },
});

export const { setPageNum, setSearchQuery } = allBooksSlice.actions;

export const selectBooks = (state) => state.allBooks.books;
export const selectSearchQuery = (state) => state.allBooks.searchQuery;
export const selectTotalPage = (state) => state.allBooks.totalPage;
export const selectLimit = (state) => state.allBooks.limit;
export const selectPageNum = (state) => state.allBooks.pageNum;
export const selectIsLoading = (state) => state.allBooks.isLoading;

export default allBooksSlice.reducer;
