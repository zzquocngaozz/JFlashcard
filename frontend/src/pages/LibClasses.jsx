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
import ClassSingle from "../components/Cards/ClassSingle";
import { fuzzySearch } from "../utils/search";
import useAuth from "../hooks/useAuth";

const LibClasses = () => {
  const { currentUser } = useAuth();
  const data = [
    {
      classRoomId: 1,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 11,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      classRoomId: 2,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/8",
      teacher: {
        userId: 21,
        userName: "BanKai02",
        role: 2,
      },
    },
    {
      classRoomId: 3,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/7",
      teacher: {
        userId: 11,
        userName: "BanKai01",
        role: 2,
      },
    },
    {
      classRoomId: 4,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 11,
        userName: "BanKai03",
        role: 2,
      },
    },
    {
      classRoomId: 5,
      classRoomName: "Lớp học choukai cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 10,
        userName: "Khai03",
        role: 2,
      },
    },
    {
      classRoomId: 6,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 11,
        userName: "BanKai03",
        role: 2,
      },
    },
    {
      classRoomId: 7,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 12,
        userName: "BanKai03",
        role: 2,
      },
    },
    {
      classRoomId: 8,
      classRoomName: "Lớp học kaiwa cô Kai",
      classRoomCode: "avxC2sss",
      description: "Lớp học kaiwa khoá 7 kỳ 3",
      numberStudent: 27,
      numberSet: 10,
      createdAt: "2023/10/10",
      teacher: {
        userId: 12,
        userName: "BanKai03",
        role: 2,
      },
    },
  ];
  const [classList, setClassList] = useState([]);
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
          (clazz) =>
            fuzzySearch(
              searchParam,
              clazz.classRoomName + clazz.teacher.userName
            ) &&
            (paramFilter === 0
              ? true
              : paramFilter === 2
              ? clazz.teacher.userId === currentUser.userId
              : clazz.teacher.userId !== currentUser.userId)
        );
        setClassList(result);

        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter]);

  useEffect(() => {
    const startSet = 6 * (currentPage - 1);
    const endSet = startSet + 6;
    const pagingList = classList?.slice(startSet, endSet);

    setPaginList(pagingList);
  }, [currentPage, classList]);

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Typography variant="h6" sx={{ mt: "15px" }}>
        Tổng số lớp: {classList.length}
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
            <InputLabel id="filter-label">Các lớp</InputLabel>
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
              <MenuItem value={1}>Đã tham gia</MenuItem>
              <MenuItem value={2}>Đã tạo</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {classList.length > 6 ? (
          <Pagination
            count={Math.ceil(classList.length / 6.0)}
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
        }}
      >
        {paginList.map((clazz) => (
          <ClassSingle key={clazz.classRoomId} clazz={clazz} />
        ))}
      </Stack>
    </>
  );
};
export default LibClasses;
