"use client";
import { Button, Stack, TextField } from "@/components/@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <form action="/search" method="get">
      <Stack direction="row" spacing={1}>
        <TextField
          placeholder="搜尋產品..."
          size="small"
          name="query"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          focused
          fullWidth
        />
        <Button type="submit" variant="contained" color="secondary">
          <SearchIcon />
        </Button>
      </Stack>
    </form>
  );
};

export default Search;
