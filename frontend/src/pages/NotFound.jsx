import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import notfoundsvg from '../assets/images/notfound.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(()=>{
    document.title="Không tìm thấy | JFlashcards"
  },[])

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
      <Typography maxWidth={500} textAlign='center'>Xin lỗi! Chúng tôi không thể tìm thấy trang mà bạn mong muốn
        .Hãy chắc rằng bạn nhập đúng đường dẫn.Để chắc chắn hãy kiểm tra lại đường dẫn của bạn
      </Typography>
      <img src={notfoundsvg} loading="lazy" alt='not found' style={{width:400, height:300, objectFit:'cover'}}/>
      <Button variant='contained'><Link to ="/" style={{color:"#fff"}}>Trở lại trang chủ</Link></Button>
    </Stack>
  )
}

export default NotFound