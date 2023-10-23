import { useState } from 'react';
import axios from 'axios'; // Import thư viện axios

const useRegister = ({setAlert}) => {
// chứa dữ liệu trả về 
  const [loading, setLoading] = useState(false);
//   const {accessToken} = useAuth()

  const registerAccount = async (newData) => {
    try {
      setLoading(true);
        const config = {
            headers: {
            //   'Authorization': `${accessToken}`,
              'Content-Type': 'application/json',
            },
          };
      // Gửi yêu cầu POST để thêm mới dữ liệu
      const response = await axios.post('http://localhost:8081/api/v1/register', JSON.stringify(newData), config);
      
      setLoading(false);
      if(!loading){
        
        setAlert({
          open:true,
          message:"Đăng ký tài khoản thành công",
          serverity:"success"
        })
      }
      
    } catch (error) {

      setLoading(false);
      console.log("Error:", error);
      setAlert({
          open:true,
          severity:"error",
          message:(error.response?.data?.errors?.body[0]),
      })
      }
    
  };

  return { loading, registerAccount };
};

export default useRegister;