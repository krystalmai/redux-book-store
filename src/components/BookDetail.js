import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

const BookDetail = (book, img) => {
  return (
    <Grid container spacing={2} p={4} mt={5} sx={{ border: "1px solid black" }}>
      <Grid item md={4}>
        {book && <img width="100%" src={img} alt="" />}
      </Grid>
      <Grid item md={8}>
        {book && (
          <Stack>
            <h2>{book.title}</h2>
            <Typography variant="body1">
              <strong>Author:</strong> {book.author}
            </Typography>
            <Typography variant="body1">
              <strong>Year:</strong> {book.year}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {book.country}
            </Typography>
            <Typography variant="body1">
              <strong>Pages:</strong> {book.pages}
            </Typography>
            <Typography variant="body1">
              <strong>Language:</strong> {book.language}
            </Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default BookDetail;
