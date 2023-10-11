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
    // TODO: bo comment sau khi lay dc user o be
    const updateUser = (data)=>{
        console.log(data)
        // localStorage.setItem("jwtUser",btoa(encodeURI(JSON.stringify(data.user))))
        // currentUser(data.user)
        // setCurrentUser(data.user)
    }

    const logout = ()=>{
        setCurrentUser(null)
        setAccessToken(null)
        localStorage.removeItem("jwtUser")
        localStorage.removeItem("accessToken")
    }


    return {currentUser,accessToken,updateUser,isLogin,login,logout}
}

export default useAuth