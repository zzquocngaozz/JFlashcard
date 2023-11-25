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
import { fuzzySearch } from "../utils/search";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import SetManager from "../components/Cards/SetManager";
import useLibSetManager from "../hooks/useLibSetManager";
import { FLAG_STATUS } from "../utils/constant";
import useAuth from "../hooks/useAuth";

const LibSetManager = () => {
  const { currentUser } = useAuth();
  const { listSet: data, loading } = useLibSetManager();
  const [flashcardSetList, setFlashcardList] = useState([]);
  const [paginList, setPaginList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  // const [paramFilter, setParamFilter] = useState(0);
  const [paramFilter, setParamFilter] = useState({
    type: 0,
    status: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };

  // const handleChangeFilter = (e) => {
  //   setParamFilter(e.target.value);
  // };
  const handleChangeTypeFilter = (e) => {
    setParamFilter({ ...paramFilter, type: e.target.value });
  };
  const handleChangeStatusFilter = (e) => {
    setParamFilter({ ...paramFilter, status: e.target.value });
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!data) {
        // const result = data.filter(
        //   (set) =>
        //     fuzzySearch(searchParam, set.title) &&
        //     (paramFilter === 0 ? true : set.type === paramFilter)
        // );
        const result = data.filter((set) => {
          // return fuzzySearch(searchParam, card.term) &&
          // (paramFilter.type === 0 ? true : getCardType(card) === paramFilter)
          if (paramFilter.type === 0 && paramFilter.status === 0)
            return fuzzySearch(searchParam, set.title) && true;
          if (paramFilter.type !== 0 && paramFilter.status === 0)
            return (
              fuzzySearch(searchParam, set.title) &&
              set.type === paramFilter.type
            );
          if (paramFilter.type === 0 && paramFilter.status !== 0)
            return (
              fuzzySearch(searchParam, set.title) &&
              set.status === paramFilter.status
            );
          if (paramFilter.type !== 0 && paramFilter.status !== 0)
            return (
              fuzzySearch(searchParam, set.title) &&
              set.status === paramFilter.status &&
              set.type === paramFilter.type
            );
          return false;
        });
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

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    document.title = "Bộ flashcard của bạn";
  }, []);
  return (
    <>
      {loading ? (
        <BackdropLoading />
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: "15px" }}>
            Đã tạo {flashcardSetList.length} bộ flashcard
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
                label="Tìm theo tên"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="filter-label">Loại thẻ</InputLabel>
                <Select
                  labelId="type-label"
                  id="type-label"
                  defaultValue={paramFilter.type}
                  value={paramFilter.type}
                  onChange={handleChangeTypeFilter}
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
              {currentUser.role === 2 ? (
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="filter-label">Trạng thái</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-label"
                    defaultValue={paramFilter.status}
                    value={paramFilter.status}
                    onChange={handleChangeStatusFilter}
                    autoWidth
                    label="Lọc loại thẻ"
                    variant="standard"
                  >
                    <MenuItem value={0}>Tất cả</MenuItem>
                    <MenuItem value={1}>{FLAG_STATUS[1]}</MenuItem>
                    <MenuItem value={2}>{FLAG_STATUS[2]}</MenuItem>
                    <MenuItem value={3}>{FLAG_STATUS[3]}</MenuItem>
                    <MenuItem value={4}>{FLAG_STATUS[4]}</MenuItem>
                    <MenuItem value={5}>{FLAG_STATUS[5]}</MenuItem>
                    <MenuItem value={6}>{FLAG_STATUS[6]}</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="filter-label">Trạng thái</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-label"
                    defaultValue={paramFilter.status}
                    value={paramFilter.status}
                    onChange={handleChangeStatusFilter}
                    autoWidth
                    label="Lọc loại thẻ"
                    variant="standard"
                  >
                    <MenuItem value={0}>Tất cả</MenuItem>
                    <MenuItem value={1}>{FLAG_STATUS[1]}</MenuItem>
                    <MenuItem value={2}>{FLAG_STATUS[2]}</MenuItem>
                    <MenuItem value={3}>{FLAG_STATUS[3]}</MenuItem>
                    <MenuItem value={4}>{FLAG_STATUS[4]}</MenuItem>
                  </Select>
                </FormControl>
              )}
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
              justifyContent: "flex-start",
              rowGap: "30px",
              columnGap: "25px",
              transition: "all 1s ease",
            }}
          >
            {paginList?.map((flashcardSet) => (
              <SetManager
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

export default LibSetManager;
