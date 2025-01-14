import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useVocaCardEdit = ({ handleToggleForm, importing }) => {
  const [vocaList, setVocaList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();

  useEffect(() => {
    const getVocaCard = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(
          `/createfls/${setId}/cardvpcab`,
          config
        );
        setVocaList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.status);
        setLoading(false);
      }
    };
    if (!importing) {
      getVocaCard();
    }
  }, [setId, importing]);

  const addCard = async (newVocaCard) => {
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
        `/createfls/${setId}/edit/vocab-card`,
        JSON.stringify(newVocaCard),
        config
      );
      vocaList.push(response.data);

      setVocaList(vocaList);
      handleToggleForm();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const updateCard = async (newVocaCard, handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      await axios.put(
        `/createfls/${setId}/edit/vocab-card`,
        JSON.stringify(newVocaCard),
        config
      );
      const newVocaList = vocaList.map((vocaCard) =>
        vocaCard.cardId === newVocaCard.cardId ? newVocaCard : vocaCard
      );
      setVocaList(newVocaList);
      handleToggle(); // dong from update nay la callback gui ve tu voca form
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteCard = async (cardId, handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.delete(
        `/createfls/${setId}/edit/vocab-card/${cardId}`,
        config
      );
      const newVocaList = vocaList.filter((voca) => voca.cardId !== cardId);
      setVocaList(newVocaList);
      handleToggle(); //dong form sau khi add
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  return { vocaList, loading, mutationing, deleteCard, updateCard, addCard };
};

export default useVocaCardEdit;
