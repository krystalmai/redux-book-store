import React, { useEffect } from "react";
import BookDetail from "../../components/BookDetail";
import { Box, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToReadingList,
  loadCurrentBook,
  selectBook,
  selectIsLoadingBook,
} from "./currentBookSlice";
import { ClipLoader } from "react-spinners";

const CurrentBook = () => {
  const book = useSelector(selectBook);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoadingBook);
  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    if (!book || book.id !== bookId) dispatch(loadCurrentBook(bookId));
  }, [dispatch, bookId, book]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", color: "primary.main" }}>
        <ClipLoader color="inherit" size={150} loading={true} />
      </Box>
    );
  }
  return (
    <Stack alignItems="center">
      
      {book && <BookDetail book={book} />}
      <Button
        variant="contained"
        sx={{ width: "fit-content", margin:'1rem' }}
        onClick={() => dispatch(addToReadingList(book))}
      >
        Add to Reading List
      </Button>

    </Stack>
  );
};

export default CurrentBook;
