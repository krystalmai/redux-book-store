import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import PaginationBar from "../../components/PaginationBar";
import {
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllBooks,
  selectLimit,
  selectPageNum,
  selectErrorMessage,
  selectIsLoading,
  selectTotalPage,
  selectBooks,
  selectSearchQuery,
  setPageNum
} from "./allBooksSlice";

import { useNavigate } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const AllBooks = () => {
  const books = useSelector(selectBooks);
  const totalPage = useSelector(selectTotalPage);
  const pageNum = useSelector(selectPageNum);
  const limit = useSelector(selectLimit);
  const errorMessage = useSelector(selectErrorMessage);
  const loading = useSelector(selectIsLoading);
  const query = useSelector(selectSearchQuery);

  const dispatch = useDispatch();
   
  const handlePageChange = (event, value) => {
    dispatch(setPageNum(value));
  };

  const navigate = useNavigate();
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  useEffect(() => {
    !books && dispatch(loadAllBooks({ pageNum, limit, query }));
  }, [books, dispatch, pageNum, limit, query]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", color: "primary.main" }}>
        <ClipLoader color="inherit" size={150} loading={true} />
      </Box>
    );
  }
  return (
    <div id="allbooks">
      <PaginationBar totalPage={totalPage} pageNum={pageNum} handleChange={handlePageChange} />

      {errorMessage && <Alert severity="danger">{errorMessage}</Alert>}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-around"
        flexWrap="wrap"
      >
        {books &&
          books.map((book) => (
            <Card
              key={book.id}
              onClick={() => handleClickBook(book.id)}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Stack>
    </div>
  );
};

export default AllBooks;
