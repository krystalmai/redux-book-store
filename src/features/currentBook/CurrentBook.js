import React, { useEffect } from "react";
import BookDetail from "../../components/BookDetail";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToReadingList, loadCurrentBook, selectBook, selectIsLoadingBook } from "./currentBookSlice";
import { ClipLoader } from "react-spinners";

const CurrentBook = () => {
  const book = useSelector(selectBook);
  const dispatch = useDispatch()
  const loading = useSelector(selectIsLoadingBook);
  const params = useParams();
  const bookId = params.id;
 

  useEffect(() => {
    dispatch(loadCurrentBook(bookId))
  }, [dispatch, bookId]);
  
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", color: "primary.main" }}>
        <ClipLoader color="inherit" size={150} loading={true} />
      </Box>
    );
  }
  return (
    <div>
      {book && (<BookDetail book={book} />)}

      <Button variant="outlined" sx={{ width: "fit-content" }} onClick={() => dispatch(addToReadingList(book))}>
          Add to Reading List
      </Button>
    </div>
    
  )
}



export default CurrentBook;

