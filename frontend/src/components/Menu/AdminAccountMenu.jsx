import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, styled } from '@mui/material';
import React from 'react'
import Logout from '@mui/icons-material/Logout';
import {colorGetter, getColorFromEnum} from '../../utils/colorGetter'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const AdminAccountMenu = () => {
  const {currentUser} = useAuth()
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
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', mb:1 ,borderBottom:'1px solid rgba(0,0,0,0.25)' }}>
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
        >
            <Avatar sx={{ width: 80, height: 80,bgcolor:`${getColorFromEnum(currentUser?.userName[0])}` }}>{currentUser?.userName.toUpperCase()[0]}</Avatar>
        </IconButton>
        <HiddenText>Hello, {currentUser?.firstName +" "+ currentUser?.lastName}</HiddenText>
            
            
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="add-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
            <Avatar /> Profile
            </MenuItem>
            <Divider />        
            <Link to="/signout">
              <MenuItem onClick={handleClose}>
              <ListItemIcon>
                  <Logout fontSize="small" />
              </ListItemIcon>
              Logout
              </MenuItem>
            </Link>
        </Menu>
    </>
  )
}


const HiddenText = styled(Typography)({
    maxWidth:'150px',
    textAlign:'center',
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"nowrap"
})

export default AdminAccountMenu