import useState from 'react'

const getJwtUser= ()=>{
    const jwtUser = localStorage.getItem('jwtUser')
    if(jwtUser === null) return null
    return JSON.parse((decodeURIComponent(atob(jwtUser))))
}


const useAuth = ()=>{

    const [currentUser,setCurrentUser] = useState(getJwtUser())

    const isLogin = ()=> (currentUser === null)
    
    const login=(user)=>{
        if (user !== null){
            localStorage.setItem("jwtUser",btoa(encodeURI(JSON.stringify(user))))
            setCurrentUser(user)
        }
    }

    const logout = ()=>{
        localStorage.removeItem("jwtUser")
        setCurrentUser(null)
    }


    return {currentUser,isLogin,login,logout}
}

export default useAuth