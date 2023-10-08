import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const AuthRoute = ({path,element,role}) => {
    const {accessToken,currentUser} = useAuth();
    const location = useLocation()
    console.log(currentUser," ", role," ",accessToken)

  return (
    <> 
       {currentUser.role === role ? element : <Navigate to="/access-denied" state={{from:location}} replace />}
    </>
  )
}

export default AuthRoute