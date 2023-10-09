import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const AuthoRoute = ({path,element,role}) => {
    const {accessToken,isLogin,currentUser} = useAuth();
    const location = useLocation()
    console.log(currentUser," ", role," ",accessToken)

  return (
    <> 
       {(isLogin()&&currentUser?.role === role) ? element : <Navigate to="/access-denied" state={{from:location}} replace />}
    </>
  )
}

export default AuthoRoute