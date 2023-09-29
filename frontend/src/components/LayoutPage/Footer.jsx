import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
        sx={{
            width:"100%",
            padding: "10px",
            marginTop:"20px",
            position:"relative",
            bottom:"0",
            textAlign:'center',
            boxShadow:'0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
         }}
    >
            Make by G50 && Mr.Nui with love
    </Box>
  )
}

export default Footer