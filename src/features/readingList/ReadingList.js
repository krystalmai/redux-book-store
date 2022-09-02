import React, { useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";

import {
  loadReadingList,
  selectFavoriteBooks,
  selectIsLoading,
} from "./readingListSlice";

import RemovableList from "../../components/RemovableList";

const ReadingList = () => {
  const books = useSelector(selectFavoriteBooks);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReadingList());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Reading List
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <RemovableList books={books} />
      )}
    </Container>
  );
};

export default ReadingList;
