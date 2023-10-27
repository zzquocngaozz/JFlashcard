import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminAccountMenu from "../Menu/AdminAccountMenu";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const SideNavAdmin = () => {
  return (
    <Box flex={2.5} sx={{ boxShadow: "1px 0 1px 1px rgba(0,0,0,0.08)" }}>
      <List sx={{ padding: "10px 20px 0 20px" }}>
        <AdminAccountMenu />
        <StyledNavLink to="/dashboard">
          <ListItem>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            Dashboard
          </ListItem>
        </StyledNavLink>
        <Divider sx={{ paddingTop: 1 }} />
        <Typography>Quản lý người dùng</Typography>
        <StyledNavLink to="/users/list">
          <ListItem>
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            Danh sách
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="/users/add">
          <ListItem>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            Thêm
          </ListItem>
        </StyledNavLink>
      </List>
    </Box>
  );
};

const StyledNavLink = styled(NavLink)({
  "& li": {
    borderRadius: "0 5px",
  },
  "&.active li": {
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  "&:hover li": {
    backgroundColor: "rgba(0,0,0,0.25)",
  },
});

export default SideNavAdmin;
