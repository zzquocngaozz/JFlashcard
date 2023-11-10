import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useClassSet = () => {
  const [classSets, setClassSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const [adding, setAdding] = useState(false);
  const { classRoomId } = useParams();
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
          `/classroom/${classRoomId}/set/list`,
          config
        );
        console.log(response.data);
        setClassSets(response.data);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error?.response?.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        // setLoading(false);
      }
    };
    if (!adding) getSet();
  }, [classRoomId, adding]);

  const deleteClassSet = async (classSetId, handleTogle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      await axios.put(
        `/classroom/${classRoomId}/set/delete/${classSetId}`,
        "",
        config
      );
      const deletedList = classSets.filter(
        (set) => set.classSetId !== classSetId
      );
      setClassSets(deletedList);
      handleTogle();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  // const addClassSet = (classSet) => {
  //   const newList = [...classSets, classSet];
  //   setClassSets(newList);
  // };
  const addClassSet = () => {
    setAdding((prev) => !prev);
  };

  const updateClassSet = async (classSet, handleToggleUpdate) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      await axios.put(
        `/classroom/${classRoomId}/set/update`,
        JSON.stringify(classSet),
        config
      );
      const newList = classSets.map((oldClassSet) =>
        oldClassSet.classSetId === classSet.classSetId ? classSet : oldClassSet
      );
      setClassSets(newList);
      setMutationing(false);
      handleToggleUpdate();
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    classSets,
    loading,
    mutationing,
    adding,
    deleteClassSet,
    updateClassSet,
    addClassSet,
  };
};

export default useClassSet;
