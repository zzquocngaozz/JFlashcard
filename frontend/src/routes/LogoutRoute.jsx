import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LogoutRoute = () => {
    const {logout} = useAuth();
    const location = useLocation()

    useEffect(()=>{
        logout()
        console.log('logout')
    })
    
  return (
    <Navigate to="/signin" state={{from:location}} replace />
  )
}

export default LogoutRoute