import React from "react";
import {
  Stack,
} from "@mui/material";

import BookCard from "./BookCard";

function BookList({ books }) {
  

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      rowGap={3}
      columnGap={2}
      margin={3}
    >
      {books &&
        books.map((book) => (
         
            <BookCard key={book.id} book={book}/>
        
        ))}
    </Stack>
  );
}

export default BookList;
