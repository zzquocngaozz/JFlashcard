import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuthContext = ()=> useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const [authUser,setAuthUser] = useState()
    

  return (
    <AuthContext.Provider value={1}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext