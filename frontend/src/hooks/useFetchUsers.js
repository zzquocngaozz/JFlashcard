import axios from 'axios';
import { useEffect, useState } from 'react'
import useAuth from './useAuth';

const useFetchUsers = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changing, setChanging] = useState(false);
    const [error, setError] = useState(null);
    const {accessToken} =  useAuth();

    const lockUser = async (id) =>{
      try{
        setChanging(true)
          const config = {
              headers:{
                  'Content-Type':'application/json',
                  Authorization: accessToken
              }
          }
          const response = await axios.put(`/dashboard/listUser/block/${id}`,'',config)
          const updateData = data.map((user)=>user.userId=== id?{...user,looked:true}: user)
          setData(updateData)
          setChanging(false)
      }catch(error){
        setChanging(false)
          console.log(error)
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
          const response = await axios.put(`/dashboard/listUser/unblock/${id}`,'',config)
          const updateData = data.map((user)=>user.userId=== id?{...user,looked:false}: user)
          setData(updateData)
          setChanging(false)
      }catch(error){
        setChanging(false)

      }
  }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Thêm các tiêu đề cần thiết vào yêu cầu Axios
          const config = {
            headers: {
              'Authorization': `${accessToken}`,
              'Content-Type': 'application/json',
            },
          };
  
          const response = await axios.get('/dashboard/listUser', config);
              // pass du lieu ve json  
              const users = response.data
              // sau khi du lieu duoc tra ve thi set vao state va cap nhat lai loading
              setData(users);
              setLoading(false);

        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      // Gọi hàm fetchData để thực hiện yêu cầu khi component được mount
      fetchData();
    }, []); // Đặt dependency là authorizationToken
  
    return { data, loading, error,changing,lockUser,unLockUser };
}

export default useFetchUsers