import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SchoolIcon from "@mui/icons-material/School";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
const AddMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Thêm">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, color: "#007fe3" }}
          >
            <AddCircleIcon sx={{ width: 45, height: 45 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="add-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/my-lib/card-bank">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText>Kho thẻ</ListItemText>
          </MenuItem>
        </Link>

        <Link to="/create-set">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FilterNoneIcon />
            </ListItemIcon>
            <ListItemText>Bộ flashcard</ListItemText>
          </MenuItem>
        </Link>
        <Link to={"/create-folder"}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText>Thư mục</ListItemText>
          </MenuItem>
        </Link>
        {currentUser.role === 1 ? (
          <Link to="/join-class">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText>Vào lớp học</ListItemText>
            </MenuItem>
          </Link>
        ) : (
          <Link to="/create-class">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText>Lớp học</ListItemText>
            </MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default AddMenu;
