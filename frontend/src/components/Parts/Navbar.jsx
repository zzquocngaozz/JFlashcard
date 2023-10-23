import { AppBar, Box, Button, IconButton, Paper, Stack, Toolbar, styled} from '@mui/material'
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
                        sx={{marginLeft:'20px', display:"flex", alignItems:"center"
                        }}>
                            {isLogin()?<>
                            <StyleLink 
                                to="/search"
                            >
                                Tìm kiếm
                            </StyleLink>
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

const StyleLink = styled(NavLink)({
    "&": {
        position: "relative",
        "&:after": {
            // Sử dụng "&" để liên kết với lớp active của thẻ a
            content: '""',
            position: "absolute",
            bottom:"-5px",
            left: "1px",
            right: "1px",
            // width: '50px',
            height: "0px",
            backgroundColor: "#007fe3",
            transition: "all 120ms cubic-bezier(0.4, 0, 0.2, 1) 10ms",
        },
        "&:hover:after": {
            // Sử dụng "&" để liên kết với lớp active của thẻ a
            height: "3px",
            borderRadius: "3px",
        },
        "&.active:after": {
            // Sử dụng "&" để liên kết với lớp active của thẻ a
            height: "3px",
            backgroundColor: "#007fe3",
        },
    }
})

export default Navbar