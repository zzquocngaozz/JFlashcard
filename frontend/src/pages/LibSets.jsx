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
import SetSingle from "../components/Cards/SetSingle";
import { fuzzySearch } from "../utils/search";

// TODO: lam hook get list class by userid
const LibSets = () => {
  const data = [
    {
      flashcardSetId: 1,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 1,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
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
      createdAt: "2023/10/10",
      type: 1,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
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
      createdAt: "2023/10/10",
      type: 3,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
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
      createdAt: "2023/10/10",
      type: 3,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
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
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
      },
    },
    {
      flashcardSetId: 6,
      title: "Từ vựng giáo trình minanonihongo",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
      },
    },
    {
      flashcardSetId: 7,
      title: "Từ vựng minna",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
      },
    },
    {
      flashcardSetId: 8,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
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
  }, [searchParam, paramFilter]);

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
          <SetSingle
            key={flashcardSet.flashcardSetId}
            flashcardSet={flashcardSet}
          />
        ))}
      </Stack>
    </>
  );
};

export default LibSets;
