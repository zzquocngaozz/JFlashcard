import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import {useForm} from 'react-hook-form'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { role } from '../utils/regexRole'
import useAuth from '../hooks/useAuth'
import SnapBarAlter from '../components/FeedBack/SnapBarAlter'
import useSnapBarAlert from '../hooks/useSnapBarAlert'
import Logo from '../assets/images/Logo.svg'
import loginbanner from '../assets/images/loginbanner.png'
const Signin = () => {
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

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
      
      try {
        const response = await axios.post(`/login`,JSON.stringify({ ...trimData }));
        const responseData = response.data;
        // save into local storage
        login(responseData);
        console.log(responseData)
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
          paddingTop:"6rem"
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
            <Box textAlign='end'><Link to="/forgotten">Quên mật khẩu ?</Link></Box>
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
        flex={1.5}
        sx={{bgcolor:'#09092D',padding:'10px', position:"relative", }}
      > 
        <Link to="/">
          <Box width={70} height={70} sx={{position:"absolute", top:10,left:30}}>
            <img src={Logo} loading='lazy' alt='logo' style={{objectFit:'fill',objectPosition:"center"}}/>
          </Box>
        </Link>
        <Box minWidth={500} height={500}>
          <img src={loginbanner} loading='lazy' alt='logo' style={{objectFit:'cover',objectPosition:"center"}}/>
        </Box>
        <Typography variant='h5' sx={{color:'#FFF', textAlign:"center",mt:10}}>Học và ghi nhớ thật hiệu quả với JFlashcard!</Typography>
      </Box>
      {alert.open?<SnapBarAlter alert = {alert} handleCloseSnackBar={handleCloseSnackBar}/>:""}
    </Stack>
  )
}

export default Signin