import React from 'react';
import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

function BookCard({ book }) {
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  return (
    <Card
              key={book.id}
              onClick={() => handleClickBook(book.id)}
              sx={{
                width: "15rem",
                height: "28rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {`${book.title}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        
  )
}

export default BookCard