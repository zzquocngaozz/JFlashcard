import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SchoolIcon from '@mui/icons-material/School';

const AddMenu = () => {
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
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <AddCircleIcon sx={{width:45,height:45}}/> 
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NoteAddIcon />
            </ListItemIcon>
          <ListItemText>
            Bộ flashcard
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText>
            Thư mục
        </ListItemText>
        
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText>
            Vào lớp học
          </ListItemText>
        </MenuItem>      
      </Menu>
    </>
  )
}

export default AddMenu