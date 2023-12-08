import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useSnapBarAlert from "../hooks/useSnapBarAlert";

const SetEditContext = createContext({});

export const useSetEditContext = () => useContext(SetEditContext);
export const useInitSetEditContext = () => {
  const context = useContext(SetEditContext);
  const [loading, setLoading] = useState(true);
  const { setId } = useParams();
  const navigate = useNavigate();
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
        const response = await axios.get(`/createfls/${setId}`, config);
        context.setDataSet(response.data);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [setId]);

  return { ...context, loading };
};

export const useInitSetCardContext = () => {
  const context = useContext(SetEditContext);
  const [loading, setLoading] = useState(true);
  const { setId } = useParams();
  const navigate = useNavigate();
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
        const response = await axios.get(`/createfls/${setId}/card`, config);
        context.setCardList(response.data);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    if (!context.importing) getSet();
  }, [setId, context.importing]);

  return { ...context, loading };
};

export const useInitCardBankContext = () => {
  const context = useContext(SetEditContext);
  const [loading, setLoading] = useState(true);
  const { setId } = useParams();
  const navigate = useNavigate();
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
          `/createfls/${setId}/bankcard`,
          config
        );
        context.setCardBank(response.data);
        context.setSelectCard([]);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [setId]);

  return { ...context, loading };
};

const SetEditContextProvider = ({ children }) => {
  const [dataSet, setDataSet] = useState(null);

  // card set list khong phai card list
  const [cardList, setCardList] = useState(null);
  // card set list khong phai card list
  const [cardBank, setCardBank] = useState([]);
  const [selectCard, setSelectCard] = useState([]);

  const [mutationing, setMutationing] = useState(false);
  const [importing, setImporting] = useState(false);
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  const { setId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const updateSet = async (newSet, handleToggleUpdateSet) => {
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
      const newFlashSet = { ...dataSet, ...newSet };
      setDataSet(newFlashSet);
      handleToggleUpdateSet();
      if (newSet.status === 2) navigate("/my-lib/set-manager");
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const publicSet = async (handleToggle) => {
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
        `/managerset/${setId}/accept`,
        "",
        config
      );
      handleToggle();
      setMutationing(false);
      navigate("/manager/set");
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  const rejectSet = async (data, handleToggle) => {
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
        `/managerset/${setId}/rejected`,
        JSON.stringify(data),
        config
      );
      handleToggle();
      setMutationing(false);
      navigate("/manager/set");
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteSet = async (handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      const response = await axios.delete(`/createfls/${setId}`, config);
      setDataSet({ ...dataSet, status: 4 });
      setMutationing(false);
      handleToggle();
    } catch (error) {
      handleToggle();
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const handleSelectCard = (card) => {
    if (selectCard.includes(card)) {
      const newSelectCard = selectCard.filter(
        (selected) => selected.cardId !== card.cardId
      );
      setSelectCard(newSelectCard);
    } else {
      const cache = [...selectCard];
      cache.push(card);
      setSelectCard(cache);
    }
  };

  const handleAddCardSet = async (handleToggle) => {
    setImporting(true);
    const data = selectCard.reduce(
      (result, card) => [...result, card?.cardId],
      []
    );
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const res = await axios.post(
        `/createfls/${setId}/bankcard`,
        JSON.stringify({ data: data }),
        config
      );
      setImporting(false);
      handleToggle();
    } catch (error) {
      setImporting(false);
    }
  };

  const deleteCardSet = async (cardId, handleToggle) => {
    setMutationing(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    try {
      const res = await axios.delete(
        `/createfls/${setId}/card/${cardId}`,
        config
      );
      const newCardList = cardList.filter((card) => card.cardId !== cardId);

      setCardList(newCardList);
      setMutationing(false);
      handleToggle();
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errors?.body[0] || "Xoá không thành công",
      });
      handleToggle();
      setMutationing(false);
    }
  };

  return (
    <SetEditContext.Provider
      value={{
        dataSet,
        mutationing,
        importing,
        alert,
        cardList,
        cardBank,
        selectCard,
        publicSet,
        rejectSet,
        handleSelectCard,
        deleteCardSet,
        handleAddCardSet,
        setSelectCard,
        setCardBank,
        setCardList,
        setAlert,
        handleCloseSnackBar,
        setDataSet,
        deleteSet,
        updateSet,
      }}
    >
      {children}
    </SetEditContext.Provider>
  );
};

export default SetEditContextProvider;
