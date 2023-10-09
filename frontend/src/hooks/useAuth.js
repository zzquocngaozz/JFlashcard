import axios from 'axios'
import {useState} from 'react'

const getJwtUser= ()=>{
    const jwtUser = localStorage.getItem('jwtUser')
    if(jwtUser === null) return null
    return JSON.parse((decodeURIComponent(atob(jwtUser))))
}

const getAccessToken= ()=>{
    const jwt = localStorage.getItem('accessToken')
    if(jwt === null) return null
    return jwt
}

const useAuth = ()=>{
    const [accessToken,setAccessToken] = useState(getAccessToken())
    const [currentUser,setCurrentUser] = useState(getJwtUser())

    const isLogin = ()=>{ 
        return (currentUser !== null)}
    
    const login=(data)=>{
        if (data.user !== null){
            localStorage.setItem("jwtUser",btoa(encodeURI(JSON.stringify(data.user))))
            setCurrentUser(data.user)
        }
        if (data.accessToken!==null) {
            localStorage.setItem("accessToken",data.accessToken)
            setAccessToken(data.accessToken)
            
        }
    }

    const logout = ()=>{
        localStorage.removeItem("jwtUser")
        setCurrentUser(null)
        setAccessToken(null)
        localStorage.removeItem("jwtUser")
        localStorage.removeItem("accessToken")
    }


    return {currentUser,accessToken,isLogin,login,logout}
}

export default useAuth