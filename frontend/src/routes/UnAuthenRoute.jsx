import React from 'react'
import { Navigate,  useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


// route chan nguoi dung chua dang nhap
const UnAuthenRoute = ({path,children}) => {
    const {isLogin} = useAuth();

    const location = useLocation()
  return (
    <> 
       {(!isLogin())? children : <Navigate to="/home" state={{from:location}} replace />}
    </>
  )
}

export default UnAuthenRoute