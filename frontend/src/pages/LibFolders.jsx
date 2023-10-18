import React, { useState } from "react";
import FolderSingle from "../components/Cards/FolderSingle";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function LibFolders() {
  const [folderList, setFolderList] = useState([
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
  ]);

  return (
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
      {folderList.map((folder) => (
        <FolderSingle key={folder.folderId} folder={folder} />
      ))}
    </Stack>
  );
}
