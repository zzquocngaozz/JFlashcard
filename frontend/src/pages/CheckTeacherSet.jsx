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
import useFetchCheckSet from "../hooks/useFetchCheckSet";
import searhbanner from "../assets/images/searhbanner.png";
import LayoutManager from "../components/Parts/LayoutManager";

const CheckTeacherSet = () => {
  const { listSet: data, loading } = useFetchCheckSet();
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

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    document.title = "Bộ flashcard của bạn";
  }, []);
  return (
    <>
      <LayoutManager>
        {loading ? (
          <BackdropLoading />
        ) : data.length === 0 ? (
          <Stack
            height={"100%"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={150}
              height={150}
            >
              <img src={searhbanner} alt="not found" />
            </Stack>
            <Typography textAlign={"center"}>
              Hàng đợi rỗng, chưa có thẻ cần kiểm duyệt (ಥ _ ಥ)
            </Typography>
          </Stack>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: "15px" }}>
              Tổng {flashcardSetList.length} học phần
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
                  label="Có tên"
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
      </LayoutManager>
    </>
  );
};

export default CheckTeacherSet;
