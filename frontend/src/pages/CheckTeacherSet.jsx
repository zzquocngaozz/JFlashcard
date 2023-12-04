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
import { FLAG_STATUS } from "../utils/constant";
import { isOpen } from "../utils/datetimeCalc";

const CheckTeacherSet = () => {
  const { listSet: data, loading } = useFetchCheckSet();
  const [flashcardSetList, setFlashcardList] = useState([]);
  const [paginList, setPaginList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [searchProp, setSetProp] = useState(0);
  const [paramFilter, setParamFilter] = useState({
    setType: 0,
    setStatus: 5,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };

  const handleChangeFilterType = (e) => {
    setParamFilter({
      ...paramFilter,
      setType: e.target.value,
    });
  };
  const handleChangeFilterStatus = (e) => {
    setParamFilter({
      ...paramFilter,
      setStatus: e.target.value,
    });
  };
  const handleChangeSearchProp = (e) => {
    setSetProp(e.target.value);
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!data) {
        const result = data.filter((set) => {
          let targetString =
            searchProp === 0 ? set.title : set.authDTO.userName;
          if (paramFilter.setType === 0 && paramFilter.setStatus === 0)
            return fuzzySearch(searchParam, targetString) && true;
          if (paramFilter.setType !== 0 && paramFilter.setStatus === 0)
            return (
              fuzzySearch(searchParam, targetString) &&
              set.type === paramFilter.setType
            );

          if (paramFilter.setType === 0 && paramFilter.setStatus === 3) {
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === paramFilter.setStatus &&
              isOpen(set.publicAt)
            );
          }

          if (paramFilter.setType !== 0 && paramFilter.setStatus === 3) {
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === paramFilter.setStatus &&
              set.type === paramFilter.setType &&
              isOpen(set.publicAt)
            );
          }
          if (paramFilter.setType === 0 && paramFilter.setStatus === -1) {
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === 3 &&
              !isOpen(set.publicAt)
            );
          }

          if (paramFilter.setType !== 0 && paramFilter.setStatus === -1) {
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === 3 &&
              set.type === paramFilter.setType &&
              !isOpen(set.publicAt)
            );
          }
          if (paramFilter.setType === 0 && paramFilter.setStatus !== 0)
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === paramFilter.setStatus
            );

          if (paramFilter.setType !== 0 && paramFilter.setStatus !== 0)
            return (
              fuzzySearch(searchParam, targetString) &&
              set.status === paramFilter.setStatus &&
              set.type === paramFilter.setType
            );
          return false;
        });
        // const result = data.filter((set) => {
        //   let targetString =
        //     searchProp === 0 ? set.title : set.authDTO.userName;
        //   return (
        //     fuzzySearch(searchParam, targetString) &&
        //     (paramFilter.setType === 0
        //       ? set.status === paramFilter.setStatus
        //       : set.type === paramFilter.setType &&
        //         set.status === paramFilter.setStatus)
        //   );
        // });
        setFlashcardList(result);

        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter, searchProp, data]);

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
    document.title = "Xem học phần của giáo viên";
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
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack
                alignItems={"center"}
                sx={{ flexDirection: "row", columnGap: "10px" }}
              >
                <TextField
                  onChange={handleSearch}
                  label="Tìm kiếm"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="filter-label">Loại thẻ</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-label"
                    value={searchProp}
                    onChange={handleChangeSearchProp}
                    autoWidth
                    label="Tìm theo"
                    variant="standard"
                  >
                    <MenuItem value={0}>Tiêu đề</MenuItem>
                    <MenuItem value={1}>Giáo viên</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="filter-label">Loại thẻ</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-label"
                    value={paramFilter.setType}
                    onChange={handleChangeFilterType}
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
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel id="filter-label">Trạng thái</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-label"
                    defaultValue={5}
                    value={paramFilter.setStatus}
                    onChange={handleChangeFilterStatus}
                    autoWidth
                    label="Trạng thái"
                    variant="standard"
                  >
                    {/* <MenuItem value={0}>Tất cả</MenuItem> */}
                    <MenuItem value={5}>{FLAG_STATUS[5]}</MenuItem>
                    <MenuItem value={3}>{FLAG_STATUS[3]}</MenuItem>
                    <MenuItem value={-1}>Sắp công khai</MenuItem>
                    <MenuItem value={6}>{FLAG_STATUS[6]}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Pagination
                count={Math.ceil(paginList.length / 6.0)}
                color="primary"
                onChange={handleChangePaging}
              />
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
