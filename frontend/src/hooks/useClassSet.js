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
          `/classroom/${classRoomId}/classset`,
          config
        );
        console.log(response.data);
        setClassSets(response.data);
        // setClassSets([
        //   {
        //     classSetId: 1,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 1,
        //     title: "Danh sach kanji bai 1",
        //     private: false,
        //     type: 1,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        //   {
        //     classSetId: 2,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 2,
        //     title: "Danh sach tu vung bai 1",
        //     private: false,
        //     type: 2,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        //   {
        //     classSetId: 3,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 3,
        //     title: "Danh sach kanji n5",
        //     private: false,
        //     type: 1,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        //   {
        //     classSetId: 4,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 4,
        //     title: "Danh sach kanji bai 1",
        //     private: false,
        //     type: 1,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        //   {
        //     classSetId: 5,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 5,
        //     title: "Danh sach tu vung bai 1",
        //     private: false,
        //     type: 2,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        //   {
        //     classSetId: 6,
        //     startAt: new Date("2023-11-01"),
        //     dueAt: new Date("2023-11-09"),
        //     classRoomId: 1,
        //     flashcardSetId: 6,
        //     title: "Danh sach kanji n5",
        //     private: false,
        //     type: 1,
        //     numberCard: 60,
        //     authDTO: {
        //       userId: 1,
        //       userName: "hieuht01",
        //       role: 2,
        //     },
        //   },
        // ]);
        setLoading(false);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error?.response?.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        // setLoading(false);
      }
    };
    getSet();
  }, [classRoomId, adding]);

  const deleteClassSet = async (setId) => {
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
        `/createfolder/${classRoomId}/get-all-set/${setId}`,
        config
      );
      const deletedList = classSets.filter(
        (set) => set.flashcardSetId !== setId
      );
      setClassSets(deletedList);
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

  const updateClassSet = async (classSet) => {
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
        `/createfolder/${classRoomId}/get-all-set/`,
        JSON.stringify(classSet),
        config
      );
      const updateList = classSets.filter((set) =>
        set.flashcardSetId !== classSets.flashcardSetId ? set : classSet
      );
      setClassSets(updateList);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    classSets,
    loading,
    mutationing,

    deleteClassSet,
    updateClassSet,
    addClassSet,
  };
};

export default useClassSet;
