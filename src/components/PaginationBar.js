import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  selectPageNum,
  selectTotalPage,
  setPageNum,
} from "../features/allBooks/allBooksSlice";
import { useSelector, useDispatch } from "react-redux";

const PaginationBar = () => {
  const totalPage = useSelector(selectTotalPage);
  const pageNum = useSelector(selectPageNum);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(setPageNum(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
