import React from 'react'
import UsersTable from '../components/UsersTable'
import { Box, Stack, Typography } from '@mui/material'
import SideNavAdmin from '../components/SideNavAdmin'
import useFetchUser from '../hooks/useFetchUser'
import BackdropLoading from '../components/FeedBack/BackdropLoading'

const UserList = () => {
  const {data, loading} = useFetchUser()
  console.log(data,' ',loading)

  return (
    <Stack flexDirection="row" sx={{width:'100%', height:'100vh'}}>
      <SideNavAdmin/>
      <Box flex={10} sx={{padding:"2rem",overflowY:"scroll"}} >
        {(loading)?<BackdropLoading/>:<UsersTable data = {data} />}
      </Box>
    </Stack>
  )
}

export default UserList