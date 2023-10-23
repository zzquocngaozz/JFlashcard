import React, { useState } from 'react'
import useAuth from './useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useCreateFolder = () => {
    const [loading,setLoading] = useState(false)
    const {accessToken} = useAuth()
    const navigate = useNavigate()

    const createFolder = async (data)=>{
        setLoading(true);
        const config = {
            headers:{
                "Content-Type":"application/json",
                "Authorization":accessToken
            }
        }
        try{
            const response = await axios.post("/createfolder", JSON.stringify(data) ,config )
            const url = `/folders/${response.data.id}`
            navigate(url)
        } catch(error){
            setLoading(false)
        }
    }


  return {loading, createFolder}
}

export default useCreateFolder