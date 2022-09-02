import React from "react";
import {useDispatch} from 'react-redux'
import SearchForm from "../components/SearchForm";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import { Container,  Stack,  Typography } from "@mui/material";
import AllBooks from "../features/allBooks/AllBooks";
import { setSearchQuery } from "../features/allBooks/allBooksSlice";



const HomePage = () => {
  const dispatch = useDispatch();
  //--------------form
  const defaultValues = {
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    dispatch(setSearchQuery(data.searchQuery));
  };
  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>Book Store</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <AllBooks />
      </Stack>
    </Container>
  );
};

export default HomePage;
