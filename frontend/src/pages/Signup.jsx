import {  Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { isBirthDate } from '../utils/datetimeCalc'
import { role } from '../utils/regexRole';
import useSnapBarAlert from '../hooks/useSnapBarAlert';
import useRegister from '../hooks/useRegister';
import Logo from '../assets/images/Logo.svg'
import registerbanner from '../assets/images/registerbanner.png'
import SnapBarAlter from '../components/FeedBack/SnapBarAlter';
import BackdropLoading from '../components/FeedBack/BackdropLoading'


const Signup = () => {
    const {register,handleSubmit,watch,setError,clearErrors,formState:{errors}} = useForm()
    // 
    // const isAdding = useRef(false);

    const {alert,setAlert,handleCloseSnackBar} = useSnapBarAlert();

    const {loading,registerAccount} = useRegister({setAlert});
    const onSubmit = (data)=>{
      if(!isBirthDate(birth)&&birth!==''){
        setError('birth',{
            type:'manual',
            message:'Ngày sinh của bạn không hợp lệ!'
        })
      } else{
          clearErrors('birth');
          registerAccount(data)
      }
    }

    // handle validate birthday
    const birth = watch('birth')
    useEffect(()=>{
        // neu birthday nhap roi va lon hon current date thi set loi
        if(!isBirthDate(birth)&&birth!==''){
            setError('birth',{
                type:'manual',
                message:'Ngày sinh của bạn không hợp lệ!'
            })
        } else{
            clearErrors('birth');
        }
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
             <Stack sx={{flexDirection:"row",gap:5}}>
                <TextField
                  {...register("firstName",
                  role['firstName']
                  )}
                  id="firstName-helper-text"
                  type='text'
                  label="Họ"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  variant="standard"
                  sx={{width:"50%"}}
                />
                <TextField
                  {...register("lastName",
                  role['lastName']
                  )}
                  id="lastName-helper-text"
                  type='text'
                  label="Tên"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  variant="standard"
                  sx={{width:"50%"}}
                />
            </Stack>
            <TextField
              {...register("birth",
              {required:'Vui lòng nhập ngày sinh của bạn'}
              )}
              id="birthday-helper-text"
              type='date'
              label="Sinh nhật bạn"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.birth}
              helperText={errors.birth?errors.birth.message:"JFlashcards thu thập ngày sinh để chắc bạn đủ tuổi dùng thiết bị di động"}
              variant="standard"
            />
            <TextField
              {...register("userName",
              role['userName']
              )}
              id="username-helper-text"
              type='text'
              label="Tên tài khoản"
              error={!!errors.userName}
              helperText={errors.userName?.message}
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
              label="Mật khẩu"
              type='password'
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
            />
            <Button type='submit' variant='contained' disabled={loading}>Đăng ký</Button>
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
      <Box 
        flex={1.25}
        sx={{bgcolor:'#09092D',padding:'10px', position:"relative", display:"flex", flexDirection:"column",alignItems:"center"}}
      > 
        <Link to="/">
          <Box width={70} height={70} sx={{position:"absolute", top:10,left:30}}>
            <img src={Logo} loading='lazy' alt='logo' style={{objectFit:'fill',objectPosition:"center"}}/>
          </Box>
        </Link>
        <Box width={600} height={500}>
          <img src={registerbanner} loading='lazy' alt='logo' style={{objectFit:'cover',objectPosition:"center"}}/>
        </Box>
        <Typography variant='h5' sx={{color:'#FFF', textAlign:"center",mt:5, padding:"0 20%"}}>
          Thời điểm tốt nhất để bắt đầu học là ngay lúc này với JFlash!
        </Typography>
      </Box>
      {alert.open?<SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar}/>:""}
      {loading?<BackdropLoading/>:<></>}
    </Stack>
  )
}

export default Signup