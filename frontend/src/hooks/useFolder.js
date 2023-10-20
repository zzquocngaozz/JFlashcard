import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useFolder = ({ handleToggleUpdate }) => {
  const [dataFolder, setDataFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { folderId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const updateNumSet = (isAcs)=>{
    dataFolder.numberSet = isAcs?dataFolder.numberSet++:dataFolder.numberSet--
  }

  useEffect(() => {
    const getSet = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        // const response = await axios.get(`/createfls/${setId}`, config);
        // setDataFolder(response.data);
        setDataFolder({
          folderId: 1,
          title: "Từ vựng tiếng nhật",
          description: "Từ vựng tiếng nhật",
          createdAt: "2023-10-04",
          numberSet: 1,
          userId: 6,
        })
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        // if (errorCode === 404) navigate("/not-found"); // not found
        // if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [folderId]);

  const updateFolder = async (data) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      // const response = await axios.put(
      //   `/createfls/${folderId}`,
      //   JSON.stringify(data),
      //   config
      // );
      const newFlashFolder = { ...dataFolder, ...data };
      setDataFolder(newFlashFolder);
      handleToggleUpdate();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteFolder = async () => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      // const response = await axios.delete(`/createfls/${folderId}`, config);
      // navigate("/");
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    dataFolder,
    loading,
    mutationing,
    deleteFolder,
    updateFolder,
    updateNumSet,
  };
};

export default useFolder;
