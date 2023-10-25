import { useEffect, useState } from 'react'
import useAuth from './useAuth';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useViewUser = () => {
    const [loadingUser, setLoadingUser] = useState(true);
    const [changing, setChanging] =  useState(false);
    const [user, setUser] = useState(null);
    const {accessToken} = useAuth();
    let {id} = useParams();

    const lockUser = async (id) =>{
        try{
            setChanging(true)
            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization: accessToken
                }
            }
            await axios.put(`/dashboard/listUser/block/${id}`,'',config)
            const updateUser = {...user,looked:true};
            setUser(updateUser)
            setChanging(false)
        }catch(error){
            setChanging(false)
        }
    }

    const unLockUser = async (id) =>{
        try{
            setChanging(true)
            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization: accessToken
                }
            }
            await axios.put(`/dashboard/listUser/unblock/${id}`,'',config)
            const updateUser = {...user,looked:false};
            setUser(updateUser)
            setChanging(false)
        }catch(error){
            setChanging(false)
        }
    }

    const changeRole = async (userId, role) =>{
        try{
            setChanging(true)
            const config = {
                headers:{
                    Authorization: accessToken,
                    'Content-Type':'application/json',
                }
            }
            const response = await axios.put(`/dashboard/listUser/changeRole/${userId}`
                ,JSON.stringify({role})
                ,config)
            setUser({...user,role:role})
            setChanging(false)
        }catch(error){
            setChanging(false)
        }
    }

    useEffect(()=>{
        const fetchUser = async (id)=>{
            try{
                setLoadingUser(true)
                const config = {
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: accessToken
                    }
                }
                const response = await axios.get(`/dashboard/listUser/viewUser/${id}`,config)
                setUser(response.data)
                setLoadingUser(false)
            }catch(error){
                setLoadingUser(false)
            }
        }
            fetchUser(id)
        },[id])


  return {loadingUser, user,changing,
    // fetchUser, 
    lockUser, unLockUser, changeRole}
}

export default useViewUser