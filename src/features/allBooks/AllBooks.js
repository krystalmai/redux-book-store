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
  Grid
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
  setPageNum,
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
   
      dispatch(loadAllBooks({pageNum, limit, query}));
    
  }, [dispatch, pageNum, limit, query]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", color: "primary.main" }}>
        <ClipLoader color="inherit" size={150} loading={true} />
      </Box>
    );
  }
  return (
    <Stack justifyContent="center" alignItems="center">
      <PaginationBar
        totalPage={totalPage}
        pageNum={pageNum}
        handleChange={handlePageChange}
      />

      {errorMessage && <Alert severity="danger">{errorMessage}</Alert>}

      {/* <Stack
        direction="row"
        spacing={2}
        justifyContent="space-around"
        alignItems="space-evenly"
        flexWrap="wrap"
        margin={3}

      > */}
      <Grid container spacing={3} p={1}>
        {books &&
          books.map((book) => (
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              key={book.id}
              onClick={() => handleClickBook(book.id)}
              sx={{
                width: "15rem",
                height: "30rem",
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
                  <Typography gutterBottom variant="h4" component="div" fontSize={16} fontWeight="bold">
                    {`${book.title}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
              </Card>
              </Grid>
          ))}
        </Grid>
    </Stack>
    
    // </Stack>
  );
};

export default AllBooks;
