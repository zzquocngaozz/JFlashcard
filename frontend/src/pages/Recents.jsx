import { Stack, Typography } from '@mui/material'
import React from 'react'
import useAuth from '../hooks/useAuth';
import ClassHome from '../components/ClassHome';
import RecentsHome from '../components/RecentsHome';

const Recents = () => {
    const {currentUser} = useAuth();

  return (
    <>
      <Stack sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
        <Typography>Xin chào <span className="text--cap">{currentUser.firstName} {currentUser.lastName}</span></Typography>
        <ClassHome/>
        <RecentsHome/>
      </Stack>
    </>
  )
}

export default Recents