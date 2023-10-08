import axios, { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth';

const useFetchUser = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {accessToken} =  useAuth()
  
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
  
          const response = await axios.get('http://localhost:8081/api/v1/dashboard/listUser', config);
              // pass du lieu ve json  
              const users = response.data
              // sau khi du lieu duoc tra ve thi set vao state va cap nhat lai loading
              setData(users);
              setLoading(false);
          
        //   console.log(data)
        } catch (error) {
          // Xử lý lỗi
          console.log(error)
          setError(error);
          setLoading(false);
        }
      };

      
        
  
      // Gọi hàm fetchData để thực hiện yêu cầu khi component được mount
      fetchData();
    }, []); // Đặt dependency là authorizationToken
  
    return { data, loading, error };
}

export default useFetchUser