import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

//REQUEST: need end point to get profile and update profile
const useProfile = ({setAlert}) => {
    // chứa dữ liệu trả về 
    const {accessToken} = useAuth()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false);
    //   const {accessToken} = useAuth()
    
    const getProfile = async () => {
        try {
          setLoading(true);
            const config = {
                headers: {
                  'Authorization': `${accessToken}`,
                  'Content-Type': 'application/json',
                },
              };
          // Gửi yêu cầu POST để thêm mới dữ liệu
          const response = await axios.get(
            // 'http://localhost:8081/api/v1/register'
            '#'
            , config);
          setProfile(response.data)
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

    const  updateProfile = async (data) => {
        try {
          setLoading(true);
            const config = {
                headers: {
                  'Authorization': `${accessToken}`,
                  'Content-Type': 'application/json',
                },
              };
          // Gửi yêu cầu get để thêm mới dữ liệu
          const response = await axios.post(
            'http://localhost:8081/api/v1/profile',JSON.stringify(data), config);
            setProfile(response.data)
          setLoading(false);
          if(!loading){
            
            setAlert({
              open:true,
              message:"Cập nhật profile thành công",
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


      useEffect(()=>{
        getProfile()
      },[])
    
      return {loading,profile,updateProfile};
    };
    
    export default useProfile;