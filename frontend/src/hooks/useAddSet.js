import React, { useState } from 'react'
import useAuth from './useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useAddSet = () => {
    const [loading,setLoading] = useState(false)
    const {accessToken} = useAuth()
    const navigate = useNavigate()

    const createSet = async (data)=>{
        setLoading(true);
        const config = {
            headers:{
                "Content-Type":"application/json",
                "Authorization":accessToken
            }
        }
        try{
            // const response = await axios.post("http://localhost:8079/api/v1/sets/", JSON.stringify(data) ,config )
            const url = `/${1}/edit`
            // const url = `${response.data.id}/edit`
            navigate(url)
        } catch(error){
            setLoading(false)
            console.log("lỗi rồi")
        }
    }


  return {loading, createSet}
}

export default useAddSet