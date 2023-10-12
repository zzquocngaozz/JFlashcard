import { useState} from 'react'

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
    
    const updateUser = (data)=>{
        
        localStorage.setItem("jwtUser",btoa(encodeURI(JSON.stringify(data.user))))
        currentUser(data.user)
        setCurrentUser(data.user)
    }

    const logout = ()=>{
        setCurrentUser(null)
        setAccessToken(null)
        localStorage.removeItem("jwtUser")
        localStorage.removeItem("accessToken")
        // TODO: call api to logout be :)
    }

    return {currentUser,accessToken,updateUser,isLogin,login,logout}
}

export default useAuth