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
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateIcon from "@mui/icons-material/Create";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useClassContext } from "../../context/ClassContext";
import LogoutIcon from "@mui/icons-material/Logout";

const ClassMoreAction = ({
  handleToggleUpdate,
  handleToggleDelete,
  handleLeaveClass,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();
  const { isClassAdmin } = useClassContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    handleToggleUpdate();
    handleClose();
  };
  const handleClickDelete = () => {
    handleToggleDelete();
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Thao tác">
          <IconButton onClick={handleClick} size="small">
            <MoreVertIcon sx={{ width: 25, height: 25 }} />
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
        {isClassAdmin() ? (
          <>
            <MenuItem onClick={handleClickUpdate}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText>Chỉnh sửa</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClickDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Xoá lớp học</ListItemText>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLeaveClass}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Rời lớp học</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ClassMoreAction;
