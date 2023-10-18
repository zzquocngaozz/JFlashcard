import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useKanjiCardEdit = ({ handleToggleForm,importing }) => {
  const [kanjiList, setKanjiList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();

  useEffect(() => {
    const getKanjiList = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(
          `/createfls/${setId}/cardkanji`,
          config
        );
        setKanjiList(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.status);
        setLoading(false);
      }
    };
    if(!importing) getKanjiList();
  }, [setId,importing]);

  const addCard = async (newKanjiCard) => {
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
        `/createfls/${setId}/edit/kanji-card`,
        JSON.stringify(newKanjiCard),
        config
      );
      const newKanjiList = kanjiList.push(response.data)
      console.log(kanjiList)
      setKanjiList(kanjiList);
      handleToggleForm();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };


  const updateCard = async (newKanjiCard,handleToggle) => {
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
        `/createfls/${setId}/edit/kanji-card`,
        JSON.stringify(newKanjiCard),
        config
      );
      const newKanjiList = kanjiList.map((kanjiCard) =>
        kanjiCard.cardKanjiId === newKanjiCard.cardKanjiId
          ? newKanjiCard
          : kanjiCard
      );
      setKanjiList(newKanjiList);
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
      const response = await axios.delete(`/createfls/${setId}/edit/kanji-card/${cardId}`, config);
      const newKanjiList = kanjiList.filter((kanjiCard) =>kanjiCard.cardKanjiId !== cardId);
      setKanjiList(newKanjiList)
      handleToggle()
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return { kanjiList, loading, mutationing, deleteCard, updateCard,addCard };
};

export default useKanjiCardEdit;
