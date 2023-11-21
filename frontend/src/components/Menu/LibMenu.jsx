import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";

const LibMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          ml: 2,
        }}
        // onClick={handleClick}
      >
        <Tooltip title="Thư viên của bạn">
          <IconButton
            LinkComponent={Link}
            to={"/my-lib"}
            size="small"
            sx={{ ml: 0, color: "#fb9805" }}
          >
            <LocalLibraryIcon sx={{ width: 35, height: 35 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default LibMenu;
