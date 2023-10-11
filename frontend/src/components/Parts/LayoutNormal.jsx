import React from 'react'
import Navbar from './Navbar'
import { Box, Stack } from '@mui/material'

const LayoutNormal = ({children}) => {
  return (
    <>
        <Navbar/>
        <Box sx={{height:"calc(100vh - 65px)",  backgroundColor:"rgba(0,0,0,0.05)",
            // flexDirection:"row", justifyContent:"space-evenly",
    }}>
            {children}
        </Box>
    </>
  )
}

export default LayoutNormal