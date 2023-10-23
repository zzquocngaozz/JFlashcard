import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useLibFolders = () => {
  const [listFolder, setListFolder] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get(`/createfolder`, config);
        setListFolder(response.data);
        setLoading(false);
      } catch (error) {
        const errorCode = error.response.status;
        setLoading(false);
      }
   
    };
    getSet();

  },[])
  return { loading, listFolder};
}

export default useLibFolders