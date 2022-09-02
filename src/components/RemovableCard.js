import React from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeFromReadingList } from "../features/readingList/readingListSlice";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

function RemovableCard({ book }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  return (
    <Box sx={{position:"relative"}}>
      <Card
        key={book.id}
        onClick={() => handleClickBook(book.id)}
        sx={{
          width: "15rem",
          height: "30rem",
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
      <Button
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "secondary.light",
          color: "secondary.contrastText",
          padding: "0",
          minWidth: "1.5rem",
        }}
        size="small"
        onClick={() => dispatch(removeFromReadingList(book.id))}
      >
        &times;
      </Button>
    </Box>
  );
}

export default RemovableCard;
