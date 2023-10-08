import { useState } from 'react';
import axios from 'axios'; // Import thư viện axios
import useAuth from './useAuth';

const useAddUser = () => {
// chứa dữ liệu trả về 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {accessToken} = useAuth()

  const addUser = async (newData) => {
    try {
      setLoading(true);
      setError(null);

        const config = {
            headers: {
              'Authorization': `${accessToken}`,
              'Content-Type': 'application/json',
            },
          };
      // Gửi yêu cầu POST để thêm mới dữ liệu
      const response = await axios.post('http://localhost:8081/api/v1/dashboard/listUser/addUser', JSON.stringify(newData), config);
          
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.errors?.body[0]);
      setLoading(false);
    }
  };

  return { loading, error, addUser };
};

export default useAddUser;