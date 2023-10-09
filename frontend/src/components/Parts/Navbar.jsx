import { AppBar, Box, Button, IconButton, Stack, Toolbar} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AccountMenu from '../Menu/AccountMenu';
import AddMenu from '../Menu/AddMenu';
import useAuth from '../../hooks/useAuth';
import Logo from '../../assets/images/Logo.svg'
import LibMenu from '../Menu/LibMenu';

const Navbar = () => {

    const {isLogin,currentUser} = useAuth()


  return (
    <>
        <AppBar position='static' color="default">
                <Toolbar>
                    <Link to="/"><img src={Logo} alt='logo' style={{width:50, height:60}}/></Link>
                    <Stack justifyContent="space-between" alignItems='center' flexDirection='row' width='calc(100% - 100px)'>
                        {/* left box */}
                        <Box
                        sx={{marginLeft:'20px', display:"flex", alignItems:"center"}}>
                            {isLogin()?<>
                            <Link 
                                style={{marginLeft:'10px'}}
                                to="#"
                            >
                                Tìm kiếm
                            </Link>
                            <LibMenu/>
                            </>
                            
                            :
                            <Link 
                                style={{marginLeft:'10px'}}
                                to="#"
                            >
                                Tìm kiếm
                            </Link>
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