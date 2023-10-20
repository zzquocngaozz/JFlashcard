import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


// route chan nguoi dung chua dang nhap
const UnAuthenRoute = ({path,element}) => {
    const {isLogin} = useAuth();

    const location = useLocation()

  return (
    <> 
       {!isLogin()? element : <Navigate to="/home" state={{from:location}} replace />}
    </>
  )
}

export default UnAuthenRoute