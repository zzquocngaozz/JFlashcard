import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

export default function useTeacherCreatedSet() {
  const [listExist, setListExist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { classRoomId } = useParams();
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
        const response = await axios.get(
          `/classroom/${classRoomId}/set/listset`,
          config
        );
        setListExist(response.data);
        // console.log(response.data);

        setLoading(false);
      } catch (error) {
        // const errorCode = error?.response?.status;
        // if (errorCode === 404) navigate("/not-found"); // not found
        // if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [classRoomId]);

  const addSetToClass = async (setId, dueAt, addClassSet) => {
    try {
      addClassSet();
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const data = {
        flashcardSetId: setId,
        dueAt: dueAt,
        classRoomId: classRoomId,
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.post(
        `/classroom/${classRoomId}/set/add`,
        JSON.stringify(data),
        config
      );
      // console.log("add ", JSON.stringify(data));
      const newList = listExist.filter((card) => card.flashcardSetId !== setId);
      setListExist(newList);
      addClassSet();
      setMutationing(false);
    } catch (error) {
      addClassSet();
      setMutationing(false);
      console.log("Error:", error?.response?.data?.errors?.body[0]);
    }
  };

  return {
    listExist,
    loading,
    mutationing,
    addSetToClass,
  };
}
