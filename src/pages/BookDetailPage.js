import React from "react";
import { ClipLoader } from "react-spinners";
import { Container, Box } from "@mui/material";
import CurrentBook from "../features/currentBook/CurrentBook";
import {useSelector} from 'react-redux'
import { selectIsLoadingBook } from "../features/currentBook/currentBookSlice";


const BookDetailPage = () => {

  const loading = useSelector(selectIsLoadingBook)

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <CurrentBook/>
      )
      }
    </Container >
  );
};

export default BookDetailPage;
