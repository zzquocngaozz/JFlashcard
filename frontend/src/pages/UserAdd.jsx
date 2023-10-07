import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SideNavAdmin from '../components/SideNavAdmin'
import { Controller, useForm } from 'react-hook-form'
import { isBirthDate } from '../utils/datetimeCalc'
import { role } from '../utils/regexRole'

const UserAdd = () => {
  const {register,handleSubmit,watch,setError,clearErrors,formState:{errors},control} = useForm()
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
    <Stack flexDirection="row" sx={{width:'100%', height:'100vh'}}>
      <SideNavAdmin/>
      <Box flex={12} sx={{padding:"2rem",overflowY:"scroll"}}>
        <Paper>
          <Typography variant='h3' textAlign='center' pt={10}>Tạo người dùng mới</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack 
              // spacing={5}
              sx={{
                flexDirection:"column",
                gap:"10px",
                width:"100%",
                padding:"10px 80px",
                marginTop:"20px",
                gap:3,
                "& input,& label":{
                  fontSize:"18px"
                }
              }}
            > 
              <Stack sx={{flexDirection:"row",gap:5}}>
                <TextField
                  {...register("firstName",
                  role['fullname']
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
                  role['fullname']
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
                helperText={errors.birthday?errors.birthday.message:""}
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
            <FormControl>
              <InputLabel htmlFor="role">
                  Loại tài khoản
              </InputLabel>
              <Controller
              control={control}
              name="role"
              defaultValue={1}
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

              <Stack sx={{ flexDirection:'row', alignItems:'center', justifyContent:'end', gap:10}}>
                <Button type='submit' variant='contained'>Tạo</Button>
                <Button type='button' variant='contained' color="error">Huỷ tạo</Button>
              </Stack>
            </Stack >
          </form>
        </Paper>
      </Box>
  </Stack>
  )
}

export default UserAdd