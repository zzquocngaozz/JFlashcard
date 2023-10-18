import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useGrammarCardEdit = ({ handleToggleForm,importing }) => {
  const [grammarList, setGrammarList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();

  useEffect(() => {
    const getGrammarList = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(
          `/createfls/${setId}/cardgrammar`,
          config
        );
        setGrammarList(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.status);
        setLoading(false);
      }
    };
    if(!importing) getGrammarList();
  }, [setId,importing]);

  const addCard = async (newGrammarCard) => {
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
        `/createfls/${setId}/edit/grammar-card`,
        JSON.stringify(newGrammarCard),
        config
      );
      grammarList.push(response.data)
      console.log(grammarList)
      setGrammarList(grammarList);
      handleToggleForm();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };


  const updateCard = async (newGrammarCard,handleToggle) => {
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
        `/createfls/${setId}/edit/grammar-card`,
        JSON.stringify(newGrammarCard),
        config
      );
      const newGrammarList = grammarList.map((grammarCard) =>
           grammarCard.cardGrammarId === newGrammarCard.cardGrammarId
          ? newGrammarCard
          : grammarCard
      );
      setGrammarList(newGrammarList);
      handleToggle();
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
      const response = await axios.delete(`/createfls/${setId}/edit/grammar-card/${cardId}`, config);
      const newGrammarList = grammarList.filter((grammarCard) =>grammarCard.cardGrammarId !== cardId);
      setGrammarList(newGrammarList)
      handleToggle()
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return { grammarList, loading, mutationing, deleteCard, updateCard,addCard};
};

export default useGrammarCardEdit;
