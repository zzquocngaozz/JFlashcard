import { AppBar, Box, Button, IconButton, Paper, Stack, Toolbar} from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AccountMenu from '../Menu/AccountMenu';
import AddMenu from '../Menu/AddMenu';
import useAuth from '../../hooks/useAuth';
import Logo from '../../assets/images/Logo.svg'
import LibMenu from '../Menu/LibMenu';

const Navbar = () => {

    const {isLogin,currentUser} = useAuth()


  return (
    <>
        <AppBar position='static' color="default" sx={{ bgcolor:'#fff', boxShadow:"none", borderBottom:"1px solid rgba(0,0,0,0.2)"}}>
                <Toolbar >
                    <Link to="/"><img src={Logo} alt='logo' style={{width:50, height:60}}/></Link>
                    <Stack justifyContent="space-between" alignItems='center' flexDirection='row' width='calc(100% - 100px)'>
                        {/* left box */}
                        <Box
                        sx={{marginLeft:'20px', display:"flex", alignItems:"center",
                            "& a:hover":{
                                borderBottom:"1px solid #0019FC"
                            },

                            "& a.active":{
                                borderBottom:"1px solid #0019FC"
                            }
                        }}>
                            {isLogin()?<>
                            <NavLink 
                                style={{marginLeft:'10px'}}
                                to="/search"
                            >
                                Tìm kiếm
                            </NavLink>
                            <LibMenu/>
                            </>
                            
                            :
                            <NavLink 
                                style={{marginLeft:'10px'}}
                                to="/search"
                            >
                                Tìm kiếm
                            </NavLink>
                            }
                        </Box>
                        {/* Right box */}
                        <Stack
                        sx={{alignItems:"center", flexDirection:"row",gap:"10px",marginLeft:'10px'}}>

                            {isLogin()?
                            (<>
                                <AddMenu/>
                                <AccountMenu/>
                            </>)

                            :
                            <Button variant='outlined' LinkComponent={Link} to="/signin"  sx={{maxHeight:"40px"}}>
                                       Đăng nhập
                            </Button> 
                            }
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
    </>
  )
}

export default Navbar