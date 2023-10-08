import React, { useTransition } from 'react'
import UsersTable from '../components/UsersTable'
import { Box, Stack, Typography } from '@mui/material'
import SideNavAdmin from '../components/SideNavAdmin'
import UserTable from '../components/UserTable'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import useFetchUser from '../hooks/useFetchUser'

const UserList = () => {
  const {data, loading} = useFetchUser()
  console.log(data,' ',loading)
  
  return (
    <Stack flexDirection="row" sx={{width:'100%', height:'100vh'}}>
      <SideNavAdmin/>
      <Box flex={12} sx={{padding:"2rem",overflowY:"scroll"}} >
        {(loading)?<Typography>Loading...</Typography>:<UsersTable data = {data} />}
      </Box>
    </Stack>
  )
}

export default UserList