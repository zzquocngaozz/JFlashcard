import { Alert, AlertTitle, Box, Button, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { isBirthDate } from '../utils/datetimeCalc'
import {MUIAlert,alert} from '../components/FeedBack/AlterError';
import useFeedBack from '../hooks/useFeedBack';
import { role } from '../utils/regexRole';





const Signup = () => {
    const {register,handleSubmit,watch,setError,clearErrors,formState:{errors}} = useForm()
    // 
    const [errorMessage,setErrorMessage] = useState(null)

    console.log('check reload')

    
    const onSubmit = (data)=>{
        console.log(data)
    }

    // handle validate birthday
    const birth = watch('birthday')
    useEffect(()=>{
        console.log(birth==='')
        // neu birthday nhap roi va lon hon current date thi set loi
        if(!isBirthDate(birth)&&birth!==''){
            setError('birthday',{
                type:'manual',
                message:'Ngày sinh của bạn không hợp lệ!'
            })
        } else{
            console.log(isBirthDate(birth),'is birthday')
            clearErrors('birthday');}
    },[birth])

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
          paddingTop:"5rem",
          overflow:'scroll'
        }}
      >
        <Typography variant='h3' textAlign='center'>Đăng ký</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack 
            // spacing={5}
            
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
              {...register("fullname",
              role['fullname']
              )}
              id="fullname-helper-text"
              type='text'
              label="Tên đầy đủ"
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              variant="standard"
            />
            <TextField
              {...register("birthday",
              {required:'Vui lòng nhập ngày sinh của bạn'}
              )}
              id="birthday-helper-text"
              type='date'
              label="Sinh nhật bạn"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.birthday}
              helperText={errors.birthday?errors.birthday.message:"JFlashcards thu thập ngày sinh để chắc bạn đủ tuổi dùng thiết bị di động"}
              variant="standard"
            />
            <TextField
              {...register("username",
              role['username']
              )}
              id="username-helper-text"
              type='text'
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
              variant="standard"
            />
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
            <Button type='submit' variant='contained'>Đăng ký</Button>
            <Stack sx={{ border:'1px solid blue', 
                        borderStyle:"double dashed"
                        , padding:'10px' 
                        ,flexDirection:'row', alignItems:'center', justifyContent:'center'
            }}>
              <Typography variant='a'>Đã có tài khoản JFlashcards ?</Typography>
              <Link to="/signin">Trở lại đăng nhập</Link>
            </Stack>
          </Stack >
        </form>
      </Box>
      <Box flex={1}
        sx={{bgcolor:'rgba(250,255,23,0.5)',padding:'10px'}}>
          <Button onClick={()=>{
            setErrorMessage("Đây là một lỗi server rất nghiêm trọng và bạn phải đợi máy chủ reset camonw vi da doc den day");
          }}
          >
            Lỗi sever
          </Button>
          <Button onClick={()=>{
            setErrorMessage(null);
          }}
          >
            Submit
          </Button>
        <Typography variant='h3'>Tạo bộ thẻ của chính bạn và bắt đầu học ngay hôm nay</Typography>
      </Box>
      {(errorMessage!=null)?<MUIAlert severity="error" message={errorMessage}/>:""}
    </Stack>
  )
}

export default Signup