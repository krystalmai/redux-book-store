import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import PaginationBar from "../../components/PaginationBar";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadAllBooks, selectIsLoading, selectBooks } from "./allBooksSlice";

import BookList from "../../components/BookList";

const AllBooks = () => {
  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) dispatch(loadAllBooks());
  }, [dispatch, loading]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", color: "primary.main" }}>
        <ClipLoader color="inherit" size={150} loading={true} />
      </Box>
    );
  }
  return (
    <Stack justifyContent="center" alignItems="center">
      <PaginationBar />
      <BookList books={books} />
    </Stack>
  );
};

export default AllBooks;
