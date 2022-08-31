import api from "../../apiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAllBooks = createAsyncThunk(
  "allBooks/loadAllBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

export const allBooksSlice = createSlice({
  name: "allBooks",
  initialState: {
    books: [],
    searchQuery: "",
    totalPage: 10,
    limit: 10,
    pageNum: 1,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
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
        state.books = action.payload;
        
      })
      .addCase(loadAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.error.message;
        
      });
  },
});

export const { setPageNum, setSearchQuery } = allBooksSlice.actions;

export const selectBooks = (state) => state.allBooks.books;
export const selectSearchQuery = (state) => state.allBooks.searchQuery;
export const selectTotalPage = (state) => state.allBooks.totalPage;
export const selectLimit = (state) => state.allBooks.limit;
export const selectPageNum = (state) => state.allBooks.pageNum;
export const selectErrorMessage = (state) => state.allBooks.errorMessage;
export const selectIsLoading = (state) => state.allBooks.isLoading;

export default allBooksSlice.reducer;
