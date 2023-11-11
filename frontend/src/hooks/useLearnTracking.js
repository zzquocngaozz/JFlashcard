import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useLearnTracking = () => {
  const [learnProgress, setLearnProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { classRoomId, classSetId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getClassMember = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(
          `/tracking/${classRoomId}/class/set/${classSetId}`,
          config
        );
        // console.log(response.data);
        setLearnProgress(response.data);
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
    getClassMember();
  }, [classRoomId]);

  const sendEmail = async (
    listEmailWarn,
    listEmailRemind,
    handleToggleAlertDelete
  ) => {
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
        // `/classroom/${classRoomId}/deleteMember/${userId}`,
        config
      );
      // const newList = classMember.filter((member) => member.userId !== userId);
      // setClassMember(newList);
      handleToggleAlertDelete();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    learnProgress,
    loading,
    mutationing,
  };
};

export default useLearnTracking;
