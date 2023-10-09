import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


// route chan nguoi dung chua dang nhap
const AuthenRoute = ({path,element}) => {
    const {isLogin} = useAuth();
    const location = useLocation()

  return (
    <> 
       {isLogin()? element : <Navigate to="/access-denied" state={{from:location}} replace />}
    </>
  )
}

export default AuthenRoute