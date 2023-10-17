import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useSetEdit = ({handleToggleUpdateSet}) => {
  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('15 useSetEdit')
    const getSet = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(`/createfls/${setId}`, config);
        setDataSet(response.data);
        setLoading(false);
    
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status
        if(errorCode === 404 )navigate('/not-found') // not found
        if(errorCode === 401) navigate('/access-denied') // not authorize
        console.log(error.response.status,'useSetEdit 35');
        setLoading(false);
      }
    };
    getSet();
  }, [setId]);

  const updateSet = async (newSet) => {
    console.log(newSet)
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.put(
        `/createfls/${setId}`,
        JSON.stringify(newSet),
        config
      );
      const newFlashSet = {...dataSet,...newSet}
      setDataSet(newFlashSet);
      handleToggleUpdateSet();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteSet = async () => {
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
        `/createfls/${setId}`,config
      );
      navigate("/");
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return { dataSet, loading, mutationing, deleteSet, updateSet };
};

export default useSetEdit;
