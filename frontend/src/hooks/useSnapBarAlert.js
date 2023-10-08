import React, { useState } from 'react'

const useSnapBarAlert = () => {
    const [alert,setAlert] = useState({open:false,severity:"error",message:""})

    const handleCloseSnackBar = ()=>{
        setAlert({
          ...alert,
          open : false
        })
      }
  return {alert,setAlert,handleCloseSnackBar}
}

export default useSnapBarAlert