import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { useClassContext } from "../context/ClassContext";

const useClassroom = ({ handleToggleUpdate }) => {
  const [classroom, setClassroom] = useState({});
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { classRoomId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { setClass } = useClassContext();

  useEffect(() => {
    const getClassroom = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(`/classroom/${classRoomId}`, config);
        setClassroom(response.data);
        setClass(response.data);
        // setDataFolder({
        //   folderId: 1,
        //   title: "Từ vựng tiếng nhật",
        //   description: "Từ vựng tiếng nhật",
        //   createdAt: "2023-10-04",
        //   numberSet: 1,
        //   userId: 6,
        // })
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getClassroom();
  }, [classRoomId]);

  const updateClassroom = async (data) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu put để update
      const response = await axios.put(
        `/classroom/${classRoomId}`,
        JSON.stringify(data),
        config
      );
      const newClassroom = { ...classroom, ...data };
      setClassroom(newClassroom);
      handleToggleUpdate();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteClassroom = async () => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      const response = await axios.delete(`/classroom/${classRoomId}`, config);
      navigate("/");
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const leaveClass = async (userId, handleToggleAlert) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      const response = await axios.delete(
        `/classroom/${classRoomId}/deleteMember/${userId}`,
        config
      );
      navigate("/");
      handleToggleAlert();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  return {
    classroom,
    loading,
    mutationing,
    deleteClassroom,
    updateClassroom,
    leaveClass,
  };
};

export default useClassroom;
