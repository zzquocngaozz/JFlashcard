import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

//REQUEST: need end point to get profile and update profile, ask role, ask token verify, check token
// TODO:
const useProfile = ({
  setAlert,
  handleCloseUpdate,
  setOpenVerify,
  handleCloseChangeRole,
}) => {
  // chứa dữ liệu trả về
  const { accessToken, updateUser } = useAuth();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.put(
        "/profile",
        JSON.stringify(data),
        config
      );
      setProfile(response.data);
      handleCloseUpdate();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        severity: "error",
        message: error.response?.data?.errors?.body[0],
      });
    }
  };
  // getVerifyToken
  const getToken = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/profile/verify", "", config);
      setAlert({
        open: true,
        severity: "success",
        message: "Mã xác nhận đã được gửi đến email của bạn",
      });
      setOpenVerify(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        severity: "error",
        message: "Lỗi chưa xác định ở máy chủ",
      });
    }
  };

  const requestRole = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/profile/wish", "", config);
      setAlert({
        open: true,
        severity: "success",
        message: "Yêu cầu của bạn đã được lưu lại trong hệ thống",
      });
      handleCloseChangeRole();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        severity: "error",
        message: "Lỗi chưa xác định ở máy chủ",
      });
    }
  };

  const verifyUser = async (data) => {
    setLoading(true);
    setAlert({
      open: true,
      severity: "error",
      message: "Không còn hỗ trợ xác thực người dùng",
    });
  };

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        // Gửi yêu cầu GET để thêm mới dữ liệu
        const response = await axios.get("/profile", config);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          open: true,
          severity: "error",
          message: error.response?.data?.errors?.body[0],
        });
      }
    };

    getProfile();
  }, []);

  return { loading, profile, updateProfile, getToken, verifyUser, requestRole };
};

export default useProfile;
