import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import {useForm} from 'react-hook-form'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { role } from '../utils/regexRole'

const Signin = () => {
  const {
    register,// ref 1 value in form hook
    handleSubmit,// 
    watch,
    formState:{errors}
  } = useForm({
    defaultValues:{
      email:"",
      password:""
    }
  })

    const onSubmit = (data)=>{
    console.log("Click submit")
    console.log(JSON.stringify({user:data}))
    const config = {
      headers: {
        'Content-Type': 'application/json', // Set the media type to JSON
      },
    };
    axios.post('https://api.realworld.io/api/users/login', JSON.stringify({user:data}), config)
    .then((res)=>{console.log(res.data)}).catch((error)=>{console.log(error)})
  }

  useEffect(()=>{
    axios.get('https://api.realworld.io/api/articles')
    .then((res)=>{console.log(res.data)})
  },[])

  // console.log(watch('email'))

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
    </Stack>
  )
}

export default Signin