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
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AdminAccountMenu from "../Menu/AdminAccountMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";
const SideNavManager = () => {
  return (
    <Box flex={2.5} sx={{ boxShadow: "1px 0 1px 1px rgba(0,0,0,0.08)" }}>
      <List sx={{ padding: "10px 20px 0 20px" }}>
        <AdminAccountMenu />
        <StyledNavLink to="/dashboard/manager">
          <ListItem>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            Dashboard
          </ListItem>
        </StyledNavLink>
        <Typography>Quản lý học phần</Typography>
        <StyledNavLink to="/manager/set">
          <ListItem>
            <ListItemIcon>
              <FilterNoneIcon />
            </ListItemIcon>
            Danh sách
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

export default SideNavManager;
