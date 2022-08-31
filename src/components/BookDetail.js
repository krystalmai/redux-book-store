import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const BookDetail = (book) => {
  return (
    <Grid container spacing={2} p={4} mt={5} sx={{ border: "1px solid black" }}>
      <Grid item md={4}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={`${BACKEND_API}/${book.imageLink}`}
              alt={`${book.title}`}
            />
            <CardContent>
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookDetail;
