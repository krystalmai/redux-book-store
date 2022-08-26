import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const PaginationBar = ({totalPage, pageNum, handleChange}) => {

  return (
    <Stack spacing={2}>
      <Pagination count={totalPage} page={pageNum} onChange={handleChange} showFirstButton showLastButton />
    </Stack>
  );
};

export default PaginationBar;
