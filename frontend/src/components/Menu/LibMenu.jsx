import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react'

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from 'react-router-dom';

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
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', ml:2 }} onClick={handleClick}>
      <Tooltip title="Thư viên của bạn">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0, color:"#fb9805" }}
          >
            <LocalLibraryIcon sx={{width:45,height:45}}/> 
          </IconButton>
        </Tooltip>
      </Box>
    <Menu
        anchorEl={anchorEl}
        id="add-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx= {{
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} LinkComponent={Link} to="/">
          <ListItemIcon>
            <NoteAddIcon />
            </ListItemIcon>
          <ListItemText>
            Bộ flashcard
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}  LinkComponent={Link} to="/">
        <ListItemIcon>
            <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText>
            Thư mục
        </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}  LinkComponent={Link} to="/">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText>
            Lớp học
          </ListItemText>
        </MenuItem>      
      </Menu>
    </>
  )
}

export default LibMenu