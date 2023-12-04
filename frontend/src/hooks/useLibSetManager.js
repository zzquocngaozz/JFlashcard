import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useLibSetManager = () => {
  const [listSet, setListSet] = useState([]);
  const [listSelect, setListSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
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
        const response = await axios.get(`/homepage/listsetmanager`, config);
        setListSet(response.data);
        setLoading(false);
      } catch (error) {
        const errorCode = error?.response?.status;
        navigate("/access-denied");
        setLoading(false);
      }
    };
    getSet();
  }, []);

  const toggleSelectSet = (setId) => {
    const select = listSelect.find((s) => s.flashcardSetId === setId);
    if (!Boolean(select)) {
      setListSelect([
        ...listSelect,
        {
          ...listSet.find((set) => set.flashcardSetId === setId),
        },
      ]);
      return;
    }
    const temp = listSelect.filter((s) => s.flashcardSetId !== setId);
    setListSelect(temp);
  };

  const isSelected = (setId) => {
    const select = listSelect.find((s) => s.flashcardSetId === setId);
    return Boolean(select);
  };

  const updateStatusSelectedSet = () => {
    console.log(listSelect);
    const newList = listSet.map((set) =>
      isSelected(set.flashcardSetId) ? { ...set, status: 5 } : set
    );
    setListSet([...newList]);
  };
  const clearSelected = () => {
    setListSelect([]);
  };

  const setWaiting = async (handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const url = `/createfls/changestatus`;
      const data = [...listSelect];
      const payload = data.reduce((result, set) => {
        result.push({ id: set.flashcardSetId });
        return result;
      }, []);
      await axios.post(url, JSON.stringify(payload), config);
      updateStatusSelectedSet();
      clearSelected();
      setMutationing(false);
      handleToggle();
    } catch (error) {
      setMutationing(false);
      handleToggle();
      console.log(error);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  return {
    loading,
    listSet,
    listSelect,
    mutationing,
    setWaiting,
    toggleSelectSet,
    isSelected,
  };
};

export default useLibSetManager;
