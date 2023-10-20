import React, { useEffect, useState } from "react";
import FolderSingle from "../components/Cards/FolderSingle";
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LibFolders() {
  const data = [
    {
      folderId: 1,
      title: "Từ vựng tiếng nhật",
      createdAt: "2023-10-04",
      numberSet: 1,
      userId: 6,
    },
    {
      folderId: 2,
      title: "Từ vựng nhật",
      createdAt: "2023-10-02",
      numberSet: 1,
      userId: 6,
    },
    {
      folderId: 3,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    },
    {
      folderId: 4,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    },
    {
      folderId: 5,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    },
    {
      folderId: 6,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    },
    {
      folderId: 7,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    },
    {
      folderId: 8,
      title: "Từ vựng tiếng",
      createdAt: "2023-10-01",
      numberSet: 4,
      userId: 6,
    }
  ]
  const [folderList, setFolderList] = useState([]);
  const [paginList, setPaginList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    
    setSearchParam(e.target.value.trim());
  };
  const handleChangePaging = (e, value) => {
    
    setCurrentPage(value);
  };

  useEffect(() => {

    const filterData = setTimeout(() => {
      if (!!data) {
        const result = data.filter(
          (set) =>
            set.title.includes(searchParam) 
        );
        setFolderList(result);
        
        setCurrentPage(1);
      }
      
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam]);

  useEffect(() => {
    const startSet = 5 * (currentPage - 1);
    const endSet = startSet + 5;
    const pagingList = folderList?.slice(startSet, endSet);
    setPaginList(pagingList);
    
  }, [currentPage, folderList]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: "15px" }}>
        Đã tạo {folderList.length} thư mục
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
        </Stack>

        {folderList.length > 5 ? (
          <Pagination
            count={Math.ceil(folderList.length / 5.0)}
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
        paddingTop:"20px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: "30px",
      }}
    >
      {paginList.map((folder) => (
        <FolderSingle key={folder.folderId} folder={folder} />
      ))}
    </Stack>
    </>
  );
}
