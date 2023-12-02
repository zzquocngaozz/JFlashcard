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

const AddCardMenu = ({ openForm }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenForm = (index) => {
    setAnchorEl(null);
    openForm(index);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Thêm thẻ">
          <IconButton
            onClick={handleClick}
            color="primary"
            size="small"
            sx={{ ml: 2 }}
          >
            <AddCircleIcon />
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
        <MenuItem onClick={() => handleOpenForm(1)}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText>Thẻ kanji</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenForm(2)}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText>Thẻ từ vựng</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenForm(3)}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText>Thẻ ngữ pháp</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AddCardMenu;
