import React from 'react'
import UsersTable from '../components/UsersTable'
import { Box, Stack } from '@mui/material'
import SideNavAdmin from '../components/SideNavAdmin'
import UserTable from '../components/UserTable'

const UserList = () => {



  return (
    <Stack flexDirection="row" sx={{width:'100%', height:'100vh'}}>
      <SideNavAdmin/>
      <Box flex={12} sx={{padding:"2rem",overflowY:"scroll"}} >
        <UsersTable/>
      </Box>
  </Stack>
  )
}

export default UserList