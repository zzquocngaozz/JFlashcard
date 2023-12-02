import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useFolderSet = ({ adding }) => {
  const [folderSet, setFolderSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { folderId } = useParams();
  const { accessToken } = useAuth();
  const { navigate } = useNavigate();

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
        const response = await axios.get(
          `/createfolder/${folderId}/view-set-folder`,
          config
        );
        setFolderSet(response.data);
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
    getSet();
  }, [folderId, adding]);

  const deleteFolderSet = async (setId) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      await axios.delete(
        `/createfolder/${folderId}/get-all-set/${setId}`,
        config
      );
      const deletedList = folderSet.filter(
        (set) => set.flashcardSetId !== setId
      );
      setFolderSet(deletedList);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    folderSet,
    loading,
    mutationing,
    deleteFolderSet,
  };
};

export default useFolderSet;
