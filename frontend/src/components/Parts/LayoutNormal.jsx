import React from 'react'
import Navbar from './Navbar'
import { Box, Stack } from '@mui/material'
import Footer from './Footer'

const LayoutNormal = ({children}) => {
  return (
    <>
        <Navbar/>
        <Box sx={{minHeight:"calc(100vh - 65px)",  backgroundColor:"rgba(0,0,0,0.05)", overflow:"hidden",
        }}>
            {children}
        </Box>
        <Footer/>
    </>
  )
}

export default LayoutNormal