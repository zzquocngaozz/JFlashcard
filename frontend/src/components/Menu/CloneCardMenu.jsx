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
import useAuth from "../../hooks/useAuth";
import SaveIcon from "@mui/icons-material/Save";
const CloneCardMenu = ({ openForm }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
            <SaveIcon />
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
          <ListItemText>Lưu tất cả</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenForm(2)}>
          <ListItemText>Lưu những thẻ đã chọn</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CloneCardMenu;
