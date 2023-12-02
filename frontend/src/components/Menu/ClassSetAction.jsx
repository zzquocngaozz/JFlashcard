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
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useParams } from "react-router-dom";

const ClassSetAction = ({
  handleToggleUpdate,
  handleToggleDelete,
  classSetId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { classRoomId } = useParams();
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleClickUpdate = (e) => {
    handleToggleUpdate();
    handleClose(e);
  };
  const handleClickDelete = (e) => {
    handleToggleDelete();
    handleClose(e);
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
        id="action-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
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
          <ListItemText>Xoá khỏi lớp học</ListItemText>
        </MenuItem>
        <Link to={`/class/${classRoomId}/progress/${classSetId}`}>
          <MenuItem>
            <ListItemIcon
              sx={{
                transform: "rotate(90deg) translate(5px,5px)",
              }}
            >
              <EqualizerOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Xem tiến độ</ListItemText>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default React.memo(ClassSetAction);
