import React from "react";
import {
  Stack,
} from "@mui/material";

import RemovableCard from "./RemovableCard";

function RemovableList({ books }) {
  

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
         
            <RemovableCard key={book.id} book={book}/>
        
        ))}
    </Stack>
  );
}

export default RemovableList;
