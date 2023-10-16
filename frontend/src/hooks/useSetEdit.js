import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from './useAuth';
import axios from 'axios';

const useSetEdit = () => {
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mutationing, setMutationing] = useState(false);
    const {setId} = useParams();
    const {accessToken} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(accessToken)
        const getSet = async ()=>{
            setLoading(true)
            try {
                const config = {
                     headers:{
                       'Content-Type':'application/json',
                        Authorization: accessToken
                    }
                }
                const response = await axios.get(`/createfls/${setId}`,config);
                setData(response.data)
                setLoading(false)
                console.log(response.data)
            } catch(error){
                // log ra status
                // TODO: navigate to not found or accessdenied
                console.log(error.response.status)
                setLoading(false)
            }
        }
        getSet()
        }
        ,[setId])

    return { data, loading, mutationing };
  return (
    <div>useSetEdit</div>
  )
}

export default useSetEdit