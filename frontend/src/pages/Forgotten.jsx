import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import {useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { role } from '../utils/regexRole'
import useAuth from '../hooks/useAuth'
import SnapBarAlter from '../components/FeedBack/SnapBarAlter'
import useSnapBarAlert from '../hooks/useSnapBarAlert'
import Logo from '../assets/images/Logo.svg'
import forgottenbanner from '../assets/images/searhbanner.png'


const Forgotten = () => {
  const {login} = useAuth()
  const navigate = useNavigate()
  const {alert,setAlert,handleCloseSnackBar} = useSnapBarAlert()
//TODO: chuyen sang thanh custom hook sau
  

  const {
    register,// ref 1 value in form hook
    handleSubmit,// 
    formState:{errors}
  } = useForm({
    defaultValues:{
      email:""
    }
  })

    const onSubmit = async (data) => {
      
      const trimData = {
        email: data.email.trim(),
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    };

  return (
    <Stack 
    
      sx={{
        flexDirection:"row",
        height:'100vh'
      }}
    >
      <Box
        flex={1}
        sx={{
          boxShadow:'0 0 5px rgba(20,255,23,0.5)',
          borderRadius:'5px',
          padding:'10px',
          paddingTop:"6rem"
        }}
        
      >
        <Typography variant='h4' textAlign='center'>
                    Quên mật khẩu
                </Typography>
                <Typography variant='h5' textAlign='center'>
                    Vui lòng nhập lại email đã đăng ký chúng tôi sẽ gửi cho bạn mã để đổi lại mật khẩu
                </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack 
            spacing={5}
            sx={{
              flexDirection:"column",
              gap:"10px",
              width:"100%",
              padding:"10px 80px",
              marginTop:"20px",
              "& input,& label":{
                fontSize:"18px"
              }
            }}
          >
            <TextField
              {...register("email",
              role['email']
              )}
              id="email-helper-text"
              type='email'
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              
            />
            
            <Button type='submit' variant='contained'>Gửi mã xác nhận</Button>
            <Stack sx={{ border:'1px solid blue', borderStyle:"double dashed"
                        , padding:'8px' 
                        ,flexDirection:'row', alignItems:'center', justifyContent:'center'
                      }}>
              
              <Link to="/signin">Quay lại đăng nhập</Link>
            </Stack>
          </Stack >
        </form>
      </Box>
      <Box 
        flex={1}
        sx={{bgcolor:'#09092D',padding:'10px', position:"relative"}}
      > 
        <Box width={70} height={70} sx={{position:"absolute", top:10,left:10}}>
          <img src={Logo} loading='lazy' alt='logo' style={{objectFit:'fill',objectPosition:"center"}}/>
        </Box>
        <Box width={200} height={100} sx={{position: "center" , margin:'200px 0px 0px 200px'}}>
          <img src={forgottenbanner} loading='lazy' alt='logo' style={{objectFit:'cover',objectPosition:"center"}}/>
        </Box>
        <Typography variant='h5' sx={{color:'#FFF', textAlign:"center",mt:10}}>Học và ghi nhớ thật hiệu quả với JFlashcard!</Typography>
      </Box>
      {alert.open?<SnapBarAlter alert = {alert} handleCloseSnackBar={handleCloseSnackBar}/>:""}
    </Stack>
  )
}

export default Forgotten