import React, { useEffect, useState } from "react";
import FolderSingle from "../components/Cards/FolderSingle";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useLibFolders from "../hooks/useLibFolders";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

export default function LibFolders() {
  const { listFolder: data, loading } = useLibFolders();

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
        const result = data.filter((set) => set.title.includes(searchParam));
        setFolderList(result);

        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam]);

  useEffect(() => {
    const startSet = 6 * (currentPage - 1);
    const endSet = startSet + 6;
    const pagingList = folderList?.slice(startSet, endSet);
    setPaginList(pagingList);
  }, [currentPage, folderList]);

  useEffect(()=>{setFolderList(data)},[data])
  return (
    <>
      {loading ? (
        <BackdropLoading />
      ) : data?.length === 0 ? (
        <Stack height={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={70}
            height={70}
          >
            <FolderOpenIcon sx={{ fontSize: "3rem" }} />
          </Stack>
          <Typography textAlign={"center"}>
            Bạn chưa có thư mục nào
          </Typography>
        </Stack>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: "15px" }}>
            Đã tạo {folderList?.length} thư mục
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

            {folderList?.length > 6 ? (
              <Pagination
                count={Math.ceil(folderList?.length / 6.0)}
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
            {paginList?.map((folder) => (
              <FolderSingle key={folder.folderId} folder={folder} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
}
