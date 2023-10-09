import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const AuthoRoute = ({element,}) => {
    const {isLogin,currentUser} = useAuth();
    const location = useLocation()
    console.log(currentUser?.userId," ",)

  return (
    <> 
       {(isLogin()&&currentUser?.role === 3) ? element : <Navigate to="/access-denied" state={{from:location}} replace />}
    </>
  )
}

export default AuthoRoute