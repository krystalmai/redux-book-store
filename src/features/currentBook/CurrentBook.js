import React, { useEffect } from "react";
import BookDetail from "../../components/BookDetail";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToReadingList, loadCurrentBook, selectBook } from "./currentBookSlice";



const BACKEND_API = process.env.REACT_APP_BACKEND_API;

 
const CurrentBook = () => {
  const book = useSelector(selectBook);
  const dispatch = useDispatch();
  
  const params = useParams();
  const bookId = params.id;
  const img = `${BACKEND_API}/${book.imageLink}`

  useEffect(() => {
    dispatch(loadCurrentBook(bookId))
  }, [bookId, dispatch]);

  return (
    <div>
      <BookDetail book={book} img={img} />

      <Button variant="outlined" sx={{ width: "fit-content" }} onClick={() => dispatch(addToReadingList(book))}>
          Add to Reading List
      </Button>
    </div>
    
  )
}



export default CurrentBook;

