import React, { useEffect } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import TopFlashcardSet from "../components/TopFlashcardSet";
import { Stack } from "@mui/material";
import SearchPublic from "../components/SearchPublic";

const SearchPage = () => {
  useEffect(() => {
    document.title = "Tìm kiếm";
  }, []);
  return (
    <LayoutNormal>
      <Stack sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
        <SearchPublic />
        <TopFlashcardSet />
      </Stack>
    </LayoutNormal>
  );
};

export default SearchPage;
