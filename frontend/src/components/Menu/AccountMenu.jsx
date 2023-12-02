import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getColorFromEnum } from "../../utils/colorGetter";
import HistoryIcon from "@mui/icons-material/History";
const AccountMenu = () => {
  const { currentUser } = useAuth();
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: `${getColorFromEnum(currentUser?.userName[0])}`,
              }}
            >
              {currentUser?.userName.toUpperCase()[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="add-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          overflow: "visible",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Link to="/my-lib/recent">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            Lịch sử học
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/signout">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default AccountMenu;
