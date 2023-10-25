import {
  Box,
  Button,
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
import { StackList } from "./Styled/StyledStack";
import useSearchPublic from "../hooks/useSearchPublic";
import { StackContain, StackContainer } from "./Styled/Container";
import SetSkeleton from "./FeedBack/SetSkeleton";
import SetSingle from "./Cards/SetSingle";
import searhbanner from "../assets/images/searhbanner.png";
import BackdropLoading from "./FeedBack/BackdropLoading";
import SnapBarAlter from "./FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";

const SearchPublic = () => {
  const { searching, loading, listSet, searchPublic } = useSearchPublic();
  const [searchParam, setSearchParam] = useState("");
  const [filter, setFilter] = useState({ creator: 0, type: 0 });
  const [sort, setSort] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSet, setFilterSet] = useState([]);
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();

  const handleChangeSearch = (e) => {
    setSearchParam(e.target.value);
  };
  const handleSubmit = () => {
    if (!searchParam.trim()) {
      setAlert({
        ...alert,
        open: true,
        message: "Hãy nhập vào ô tìm kiếm",
        severity: "error",
      });
      return;
    }
    if (searchParam.trim().length > 50) {
      setAlert({
        ...alert,
        open: true,
        message: "Tên set học tối đa 50 ký tự",
        severity: "error",
      });
      return;
    }
    searchPublic(searchParam.trim());
  };

  const handleChangeCreator = (e) => {
    setFilter({ ...filter, creator: e.target.value });
  };
  const handleChangeType = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };
  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    console.log(!!listSet);
    console.log(filter.creator === 0 && filter.type === 0);
    console.log(filter.creator !== 0 && filter.type === 0);
    console.log(filter.creator === 0 && filter.type !== 0);

    const data = [
      ...listSet.filter((set) => {
        if (filter.creator === 0 && filter.type === 0) return true;
        if (filter.creator !== 0 && filter.type === 0)
          return set.authoDTO.role === filter.creator;
        if (filter.creator === 0 && filter.type !== 0)
          return set.type === filter.type;
        return set.authoDTO.role === filter.creator && set.type === filter.type;
      }),
    ];
    switch (sort) {
      case 1:
        data.sort((a, b) => b.numberCard - a.numberCard);
        break;
      case 2:
        data.sort((a, b) => b.votePoint - a.votePoint);
        break;
      case 3:
        data.sort((a, b) => b.numberVote - a.numberVote);
        break;
      case 4:
        data.sort(
          (a, b) => b.votePoint * b.numberVote - a.votePoint * a.numberVote
        );
        break;
      default:
        break;
    }
    console.log(sort);
    setFilterSet([...data]);
  }, [listSet, sort, filter]);
  console.log(Math.ceil(filterSet.length / 6.0));

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchPublic = setTimeout(() => {
      if (searching && searchParam.length >= 3)
        searchPublic(searchParam.trim());
      if (searching && searchParam.length < 3)
        setAlert({
          open: true,
          severity: "error",
          message: "Nhập tối thiểu 3 ký tự để search",
        });
      setFilterSet([]);
    }, 300);

    return () => {
      clearTimeout(fetchPublic);
    };
  }, [searchParam]);

  return (
    <>
      {!searching ? (
        <Stack height={250} mt={1}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <img
              src={searhbanner}
              alt="search banner"
              style={{ width: "130px", height: "130px" }}
            />
          </Stack>
          <Typography textAlign={"center"}>
            Cùng tìm kiếm những bộ thẻ public trên JFlashcard
          </Typography>

          <StackList sx={{ p: 2, justifyContent: "center" }}>
            <TextField
              type="search"
              error={alert.open}
              sx={{
                width: "50%",
                "& .Mui-error input::placeholder": { color: "red" },
              }}
              value={searchParam}
              onChange={handleChangeSearch}
              placeholder="Tìm kiếm bằng tên bộ"
            />
            <Button
              sx={{ textTransform: "none", p: "16px 20px" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Tìm kiếm
            </Button>
          </StackList>
        </Stack>
      ) : (
        <Stack minHeight={600} mt={1} mb={3} sx={{ position: "relative" }}>
          <StackList sx={{ p: 2, justifyContent: "center" }}>
            <TextField
              type="search"
              label="Tìm kiếm"
              value={searchParam}
              onChange={handleChangeSearch}
              sx={{
                width: "30%",
                "& label": { top: "-8px" },
                "& input": { p: "8px 20px" },
              }}
              placeholder="Tìm kiếm bằng tên bộ"
            />
            <FormControl sx={{ width: "130px" }}>
              <InputLabel id="creator-select-label">Tạo bởi</InputLabel>
              <Select
                labelId="creator-select-label"
                id="creator-select"
                value={filter.creator}
                label="Tạo bởi"
                onChange={handleChangeCreator}
                sx={{
                  width: "130px",
                  "& .MuiSelect-select": { padding: "8px 20px" },
                }}
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={1}>Học sinh</MenuItem>
                <MenuItem value={2}>Giáo viên</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "160px" }}>
              <InputLabel id="type-select-label">Loại thẻ</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={filter.type}
                label="Tạo bởi"
                onChange={handleChangeType}
                sx={{
                  // width: "130px",
                  "& .MuiSelect-select": { padding: "8px 20px" },
                }}
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={1}>Hán tự</MenuItem>
                <MenuItem value={2}>Từ vựng</MenuItem>
                <MenuItem value={3}>Ngữ pháp</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "160px" }}>
              <InputLabel id="type-select-label">Xếp theo</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="Tạo bởi"
                onChange={handleChangeSort}
                sx={{
                  // width: "130px",
                  "& .MuiSelect-select": { padding: "8px 20px" },
                }}
              >
                <MenuItem value={0}>Thứ tự gốc</MenuItem>
                <MenuItem value={1}>Số lượng thẻ</MenuItem>
                <MenuItem value={2}>Điểm vote</MenuItem>
                <MenuItem value={3}>Số lượng vote</MenuItem>
                <MenuItem value={4}>Tổng điểm</MenuItem>
              </Select>
            </FormControl>
          </StackList>
          <Stack>
            <StackList justifyContent={"space-between"}>
              <Typography variant="h6">Kết quả {filterSet?.length}</Typography>
              <Pagination
                count={Math.ceil(filterSet.length / 6.0)}
                color="primary"
                onChange={handleChangePaging}
              />
            </StackList>
            {loading ? (
              <StackContain>
                <SetSkeleton />
                <SetSkeleton />
                <SetSkeleton />
              </StackContain>
            ) : filterSet?.length === 0 ? (
              <Stack
                minHeight={300}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box width={70} height={70}>
                  <img src={searhbanner} loading="lazy" alt="notfound" />
                </Box>
                <Typography textAlign={"center"}>
                  Không tìm thấy kết quả khớp với mong muốn của bạn. Hãy thử tìm
                  kiếm với từ khoá khác!
                </Typography>
              </Stack>
            ) : (
              <StackContainer>
                {filterSet
                  .slice(6 * (currentPage - 1), 6 * (currentPage - 1) + 6)
                  .map((set) => (
                    <SetSingle key={set.flashcardSetId} flashcardSet={set} />
                  ))}
              </StackContainer>
            )}
          </Stack>
        </Stack>
      )}
      {loading && !searching ? <BackdropLoading /> : <></>}
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchPublic;
