import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SetSingle from "../components/Cards/SetSingle";
import SetRecent from "../components/Cards/SetRecent";
import { fuzzySearch } from "../utils/search";

// TODO: lam hook get list class by userid
const LearnHistory = () => {
  const data = [
    {
      flashcardSetId: 1,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
        userName: "BanKai01",
        role: 1,
      },
    },
    {
      flashcardSetId: 2,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
        userName: "BanKai01",
        role: 1,
      },
    },
    {
      flashcardSetId: 3,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
        userName: "BanKai01",
        role: 1,
      },
    },
    {
      flashcardSetId: 7,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      flashcardSetId: 4,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      flashcardSetId: 5,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      flashcardSetId: 6,
      title: "Từ không vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      numberStudied: 50,
      openAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
  ];
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
            fuzzySearch(searchParam,set.title) &&
            (paramFilter === 0 ? true : set.type === paramFilter)
        );
        setFlashcardList(result);
        
        setCurrentPage(1);
      }
      
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter]);

  useEffect(() => {
    const startSet = 5 * (currentPage - 1);
    const endSet = startSet + 5;
    const pagingList = flashcardSetList?.slice(startSet, endSet);
    setPaginList(pagingList);
    
  }, [currentPage, flashcardSetList]);

  return (
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
        {flashcardSetList.length > 5 ? (
          <Pagination
            count={Math.ceil(flashcardSetList.length / 5.0)}
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
  );
};

export default LearnHistory;
