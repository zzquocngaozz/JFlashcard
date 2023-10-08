import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import {useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { role } from '../utils/regexRole'
import { BASE_URL } from '../utils/constant'
import useAuth from '../hooks/useAuth'
import SnapBarAlter from '../components/FeedBack/SnapBarAlter'
import useSnapBarAlert from '../hooks/useSnapBarAlert'

const Signin = () => {
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
      email:"",
      password:""
    }
  })

    const onSubmit = async (data) => {
      
      const trimData = {
        email: data.email.trim(),
        password: data.password.trim(),
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      try {
        const response = await axios.post(
          `${BASE_URL}/login`,
          JSON.stringify({ ...trimData }),
          config
        );
    
        const responseData = response.data;
    
        login(responseData);
    
        if (responseData.user && responseData.user.role === 3) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        setAlert({
          open: true,
          severity: 'error',
          message: error.response?.data?.errors?.body[0] || 'Lỗi trả về không xác định',
        });
      }
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
          paddingTop:"10rem"
        }}
        
      >
        <Typography variant='h3' textAlign='center'>Đăng nhập</Typography>
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
            <TextField
              {...register("password"
              ,role['password']
              )}
              id="password-helper-text"
              label="Password"
              type='password'
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
            />
            <Box textAlign='end'><Link to="/signin">Quên mật khẩu ?</Link></Box>
            <Button type='submit' variant='contained'>Đăng nhập</Button>
            <Stack sx={{ border:'1px solid blue', borderStyle:"double dashed"
                        , padding:'10px' 
                        ,flexDirection:'row', alignItems:'center', justifyContent:'center'
                      }}>
              <Typography variant='a'>Mới dùng JFlashcard ?</Typography>
              <Link to="/signup">Tạo tài khoản mới</Link>
            </Stack>
          </Stack >
        </form>
      </Box>
      <Box 
        flex={1}
        sx={{bgcolor:'rgba(250,255,23,0.5)',padding:'10px'}}
      >
        <Typography variant='h3'>Tạo bộ thẻ của chính bạn và bắt đầu học ngay hôm nay</Typography>
      </Box>
      {alert.open?<SnapBarAlter alert = {alert} handleCloseSnackBar={handleCloseSnackBar}/>:""}
    </Stack>
  )
}

export default Signin