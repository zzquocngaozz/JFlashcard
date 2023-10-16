import React, { useEffect } from 'react'
import LayoutAdmin from '../components/Parts/LayoutAdmin'
import { useParams } from 'react-router-dom'
import { Avatar, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import BackdropLoading from '../components/FeedBack/BackdropLoading'
import { getColorFromEnum } from '../utils/colorGetter'
import { ROLE } from '../utils/constant'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../assets/images/Logo.svg'
import useViewUser from '../hooks/useViewUser'
import { Controller, useForm } from 'react-hook-form'

export const UserView = () => {
  const {id} = useParams()
  const {loadingUser,user:currentUser,changing,lockUser, unLockUser, changeRole} = useViewUser()

  const {control, watch,formState:{isDirty}} = useForm()

    const wrole = watch("role")
    useEffect(()=>{
        console.log(wrole,"25")
        console.log(currentUser?.role ===wrole,'26')
        if(!!wrole&& isDirty) changeRole(id,wrole)
    },[wrole])

    console.log(loadingUser," ",!currentUser,":29")

  return (
    <LayoutAdmin>
        <Box mb={2} width={90} height={70}>
            <img src={Logo} alt='Logo' />
        </Box>
        <Box 
            sx={{
                backgroundColor:"#fff",
                borderRadius:"8px",
                p:5,
                boxShadow:"1px 0 1px 1px rgba(0,0,0,0.1),0px 1px 2px 1px rgba(0,0,0,0.1)"
            }}
        >
                    <Typography variant='h5' textAlign="left" mb={2}>Thông tin cá nhân</Typography>
                    {(loadingUser)?<BackdropLoading/>:
                    (<Stack sx={{flexDirection:"row",justifyContent:"center",alignItems:"center", gap:2,}}>
                        <Stack flex={1.5} sx={{flexDirection:"column",justifyContent:"center",alignItems:"center", gap:"10px"}}>
                                
                            <Stack sx={{flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                <Avatar sx={{  width: 80, height: 80, bgcolor:`${getColorFromEnum(currentUser?.userName[0])}` }}>
                                    {currentUser?.userName.toUpperCase()[0]}
                                </Avatar>
                                <Typography>{currentUser?.userName}</Typography>
                                <Typography>{currentUser?.email}</Typography>
                            </Stack>
                            <Box sx={{cursor:"default"}}>
                                <Chip label={ROLE[currentUser?.role]} color="info" variant="outlined" sx={{mr:1}} />
                                {(currentUser?.verify)?<Chip label="Đã xác minh" color='success' variant="outlined" />
                                :<Chip label="Chưa xác minh" sx={{ borderColor:"#ff9900", color:"#ff9900"}} variant="outlined" />}
                            </Box>              
                        </Stack>
                        <Stack flex={2.5}
                            sx={{
                                flexDirection:"column",
                                gap:"30px",                                
                                padding:"10px 80px",
                                marginTop:"20px",
                                "& input,& label":{
                                    fontSize:"18px"
                                }
                         }}>
                            <Stack sx={{flexDirection:"row",gap:5}}>
                                <TextField
                                id="firstName-helper-text"
                                type='text'
                                label="Họ"
                                variant="standard"
                                sx={{width:"50%"}}
                                defaultValue={currentUser?.firstName}
                                inputProps={
                                    { readOnly: true, }
                                }
                                />
                                <TextField
                                
                                    id="lastName-helper-text"
                                    type='text'
                                    label="Tên"
                                    defaultValue={currentUser?.lastName}
                                    variant="standard"
                                    sx={{width:"50%"}}
                                    inputProps={
                                        { readOnly: true, }
                                }
                                />
                            </Stack>
                            <TextField
                                id="birthday-helper-text"
                                type='date'
                                defaultValue={currentUser?.birth}
                                label="Sinh nhật bạn"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        {currentUser?.role===3?
                            <FormControl fullWidth>
                                <InputLabel id="role-select-label">Loại tài khoản</InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        id="role-select"
                                        value={3}
                                        label="role"
                                        variant='standard'
                                        disabled={loadingUser}
                                        >
                                        <MenuItem value={3}>Quản trị viên</MenuItem>
                                    </Select>
                            </FormControl>
                            :
                            <FormControl>
                                <InputLabel htmlFor="role">
                                    Loại tài khoản
                                </InputLabel>
                                <Controller
                                control={control}
                                defaultValue={currentUser?.role}
                                disabled={changing}
                                name="role"
                                render={({ field }) => (<Select {...field} variant='standard' id="role" sx={{maxWidth:"50%",mt:10,fontSize:"18px"}}
                                    >
                                    <MenuItem value={1}>Học sinh</MenuItem>
                                    <MenuItem value={2}>Giáo viên</MenuItem>
                                    <MenuItem value={3}>Admin</MenuItem>
                                </Select>
                                    )
                                }
                                />
                            </FormControl>
                            }
                            {!currentUser?.looked?
                            <Button endIcon={<LockOutlinedIcon/>} 
                                color='error' 
                                variant='outlined' 
                                sx={{   textTransform:"none"
                                        ,mt:3
                                        ,borderRadius:"25px",
                                        width:"50%",
                                    }} 
                                disabled={changing}
                                onClick={()=>{lockUser(id)}}
                            >
                                    Khoá tài khoản
                            </Button>
                            :
                            <Button endIcon={<LockOpenIcon/>} 
                                color='success' 
                                variant='outlined' 
                                disabled={changing}
                                sx={{textTransform:"none",mt:3,width:"50%",borderRadius:"25px"}} 
                                onClick={()=>{unLockUser(id)}}
                            >
                                    Mở khoá
                            </Button>
                            }
                    </Stack>

                </Stack>)
                }         
                </Box>
    </LayoutAdmin>
  )
}
