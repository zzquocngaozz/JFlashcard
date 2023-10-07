import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountMenu from '../Menu/AccountMenu';
import AddMenu from '../Menu/AddMenu';

const Navbar = () => {
  return (
    <>
        <AppBar position='static' color="default">
                <Toolbar>
                    <Link to="/">JFlashcards</Link>
                    <Stack justifyContent="space-between" alignItems='center' flexDirection='row' width='calc(100% - 100px)'>
                        {/* left box */}
                        <Box
                        sx={{marginLeft:'20px'}}>
                            <Link 
                                style={{marginLeft:'10px'}}
                                to="#"
                            >
                                Tìm kiếm
                            </Link>
                        </Box>
                        {/* Right box */}
                        <Stack
                        sx={{alignItems:"center", flexDirection:"row",gap:"10px",marginLeft:'10px'}}>
                            <AddMenu/>
                            <AccountMenu/>
                            <Button variant='outlined' LinkComponent={Link} to="/signin"  sx={{maxHeight:"40px"}}>
                                       Đăng nhập
                            </Button> 
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
    </>
  )
}

export default Navbar