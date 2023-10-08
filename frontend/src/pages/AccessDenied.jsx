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
        Xin lỗi, không tìm thấy trang!
      </Typography>
      <Typography maxWidth={500} textAlign='center'>Xin lỗi! Có vẻ bạn đã đi lạc đến khu vực cấm. Yêu cầu truy cập của bạn không được chấp nhận. Vui lòng quay trở lại
      </Typography>
      <img src={notfoundsvg} loading="lazy" alt='not found' style={{width:400, height:300, objectFit:'cover'}}/>
      <Button variant='contained' onClick={() => navigate(-1)}>Trở lại trang trước</Button>
    </Stack>
  )
}

export default NotFound