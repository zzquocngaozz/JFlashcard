import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SetRecent from "../components/Cards/SetRecent";
import { fuzzySearch } from "../utils/search";
import useLearnHistory from "../hooks/useLearnHistory";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

// TODO: lam hook get list class by userid
const LearnHistory = () => {
  const { listSet: data, loading } = useLearnHistory();
  const [flashcardSetList, setFlashcardList] = useState([]);
  const [paginList, setPaginList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [paramFilter, setParamFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };
  const handleChangeFilter = (e) => {
    setParamFilter(e.target.value);
  };
  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!data) {
        const result = data.filter(
          (set) =>
            fuzzySearch(searchParam, set.title) &&
            (paramFilter === 0 ? true : set.type === paramFilter)
        );
        setFlashcardList(result);

        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter, data]);

  useEffect(() => {
    const startSet = 6 * (currentPage - 1);
    const endSet = startSet + 6;
    const pagingList = flashcardSetList?.slice(startSet, endSet);
    setPaginList(pagingList);
  }, [currentPage, flashcardSetList]);
  useEffect(() => {
    document.title = "Lịch sử học";
  }, []);
  return (
    <>
      {loading ? (
        <>
          <BackdropLoading />
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: "15px" }}>
            Đã học {flashcardSetList.length} bộ flashcard
          </Typography>
          <Stack
            flexDirection={"row"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Stack
              alignItems={"center"}
              sx={{ flexDirection: "row", columnGap: "10px" }}
            >
              <TextField
                onChange={handleSearch}
                label="Có tên là"
                variant="standard"
              />
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="filter-label">Loại thẻ</InputLabel>

                <Select
                  labelId="type-label"
                  id="type-label"
                  defaultValue={paramFilter}
                  value={paramFilter}
                  onChange={handleChangeFilter}
                  autoWidth
                  label="Lọc loại thẻ"
                  variant="standard"
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Hán tự</MenuItem>
                  <MenuItem value={2}>Từ vựng</MenuItem>
                  <MenuItem value={3}>Ngữ pháp</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {flashcardSetList.length > 6 ? (
              <Pagination
                count={Math.ceil(flashcardSetList.length / 6.0)}
                color="primary"
                onChange={handleChangePaging}
              />
            ) : (
              <></>
            )}
          </Stack>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              paddingTop: "20px",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: "30px",
            }}
          >
            {paginList.map((flashcardSet) => (
              <SetRecent
                key={flashcardSet.flashcardSetId}
                flashcardSet={flashcardSet}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default LearnHistory;
