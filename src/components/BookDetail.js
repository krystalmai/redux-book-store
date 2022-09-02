import React from "react";
import {

  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const BookDetail = ({ book }) => {
  return (
 
      <Stack alignItems="center" justifyContent="center" direction="row" flexWrap="wrap-reverse" gap={3}>
       
            <CardMedia
              component="img"
              image={`${BACKEND_API}/${book.imageLink}`}
            alt={`${book.title}`}
            sx={{width: '15rem', marginTop:'3rem'}}
            />
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
            
        
      </Stack>
  
  );
};

export default BookDetail;
