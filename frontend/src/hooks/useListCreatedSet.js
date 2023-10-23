import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useListCreatedSet = ({ setAdding,updateNumSet }) => {
  const [listExist, setListExist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { folderId } = useParams();
  const { accessToken } = useAuth();

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
        const response = await axios.get(`/createfolder/${folderId}/get-all-set`, config);
        setListExist(response.data);

        setLoading(false);
      } catch (error) {
        const errorCode = error.response.status;
        // if (errorCode === 404) navigate("/not-found"); // not found
        // if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [folderId]);

  const addSetToFolder = async (setId) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.post(
        `/createfolder/${folderId}/get-all-set/${setId}`,
        "",
        config
      );
      const newList = listExist.filter((card)=>card.flashcardSetId !== setId)
      setListExist(newList);
      updateNumSet(true)
      setAdding(prev=>!prev)
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };


  return {
    listExist,
    loading,
    mutationing,
    addSetToFolder,
  };
};

export default useListCreatedSet;
