import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavbarDefault = () => {
  return (
    <AppBar position='static' sx={{bgcolor:'#808'}}>
            <Toolbar>
                <Typography>JFlashcards</Typography>
                <Stack justifyContent="space-between" alignItems='center' flexDirection='row' width='calc(100% - 100px)'>

                    <Box
                    sx={{marginLeft:'10px'}}>
                        <Link 
                                style={{marginLeft:'10px'}}
                                to="#">
                                    Trang chủ</Link >
                            <Link 
                                style={{marginLeft:'10px'}}
                                to="#"
                            >
                                Tìm kiếm
                            </Link>
                    </Box>

                    <Box
                    sx={{marginLeft:'10px'}}>
                        <Link 
                                style={{marginLeft:'10px'}}
                                to="#">
                                    Login</Link >
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
  )
}

export default NavbarDefault