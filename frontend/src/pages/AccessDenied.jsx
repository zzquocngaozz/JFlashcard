import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import notfoundsvg from '../assets/images/notfound.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <Stack sx={{
        flexDirection:'column',
        gap:5,
        justifyContent:'center',
        alignItems:'center',
        maxWidth:'100%',
        height:'100vh'
    }}>
      <Typography variant='h3'>
        Truy cập bị cấm
      </Typography>
      <Typography maxWidth={500} textAlign='center'>Xin lỗi! Có vẻ bạn đã đi lạc đến khu vực cấm. Yêu cầu truy cập của bạn không được chấp nhận. Vui lòng quay trở lại
      </Typography>
      <img src={notfoundsvg} loading="lazy" alt='not found' style={{width:400, height:300, objectFit:'cover'}}/>
      <Stack  flexDirection="row" sx={{ gap:5}}>
        <Button variant='contained' onClick={() => navigate(-1)}>Trở lại trang trước</Button>
        <Button variant='contained' color='secondary' ><Link to="/" style={{color:"#FFF"}}>Về trang chủ</Link></Button>
      </Stack>
    </Stack>
  )
}

export default NotFound