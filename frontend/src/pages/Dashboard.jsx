import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SideNavAdmin from '../components/SideNavAdmin'

const Dashboard = () => {
  return (
    <Stack flexDirection="row" sx={{width:'100%', height:'100vh'}}>
      <SideNavAdmin/>
      <Box flex={10} sx={{padding:"2rem",overflowY:"scroll"}}>
        <Typography variant='h4'>Dashboard</Typography><br/><hr />
      </Box>
    </Stack>
  )
}



export default Dashboard