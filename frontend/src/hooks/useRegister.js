import { useState } from "react";
import axios from "axios"; // Import thư viện axios
import { useNavigate } from "react-router-dom";

const useRegister = ({ setAlert }) => {
  // chứa dữ liệu trả về
  const [loading, setLoading] = useState(false);
  //   const {accessToken} = useAuth()
  const navigate = useNavigate();

  const registerAccount = async (newData, reset) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          //   'Authorization': `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu POST để thêm mới dữ liệu
      const response = await axios.post(
        "/register",
        JSON.stringify(newData),
        config
      );
      reset();
      navigate("/signin");
      setLoading(false);
      if (!loading) {
        setAlert({
          open: true,
          message: "Đăng ký tài khoản thành công",
          serverity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      setAlert({
        open: true,
        severity: "error",
        message: error.response?.data?.errors?.body[0],
      });
    }
  };

  const getOtp = async (data, changeStep) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          //   'Authorization': `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu POST để thêm mới dữ liệu
      const response = await axios.post(
        "/verify",
        JSON.stringify(data),
        config
      );
      changeStep(2);
      setLoading(false);

      setAlert({
        open: true,
        message: "Mã xác nhận đã được gửi đến email của bạn",
        serverity: "success",
      });
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      setAlert({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errors?.body[0] ||
          "Không kết nối được với máy chủ",
      });
    }
  };
  const verifyOtp = async (data, changeStep) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          //   'Authorization': `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu POST để thêm mới dữ liệu
      const response = await axios.put("/verify", JSON.stringify(data), config);
      changeStep(3);
      setLoading(false);

      setAlert({
        open: true,
        message: "Đã xác nhận email! Hãy hoàn thiện thông tin tài khoản",
        serverity: "success",
      });
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      setAlert({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errors?.body[0] ||
          "Không kết nối được với máy chủ",
      });
    }
  };

  return { loading, registerAccount, getOtp, verifyOtp };
};

export default useRegister;
