import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { read, utils } from "xlsx";
import {
  getCardType,
  isGrammarCard,
  isImportGrammar,
  isImportKanji,
  isImportVoca,
  isKanjiCard,
  sortDesCreateTime,
} from "../utils/cardUtil";
import {
  parseGrammaExcel,
  parseKanjiExcel,
  parseVocaExcel,
} from "../utils/parseData";

const useLibCardBank = () => {
  const [cardBank, setCardBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [mutationing, setMutationing] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();

  const getBankCard = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const { data } = await axios.get(`/homepage/listbank`, config);
      console.log(
        sortDesCreateTime([
          ...data.kanjiDTOS,
          ...data.grammarDTOS,
          ...data.vocabDTOS,
        ])
      );
      setCardBank(
        sortDesCreateTime([
          ...data.kanjiDTOS,
          ...data.grammarDTOS,
          ...data.vocabDTOS,
        ])
      );

      setLoading(false);
    } catch (error) {
      console.log(error.response.status);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!importing) getBankCard();
    // setTimeout(() => {
    //   setCardBank([
    //     {
    //       cardId: 1,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "画面",
    //       mean: "Màn hình",
    //       example: "画面,真っ黒 だよ！TV 壊れちゃったの？",
    //       exampleMean: "Màn hình đen kịt rồi! Có phải TV bị hỏng không?",
    //       imgUrl:
    //         "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-18",
    //     },
    //     {
    //       cardId: 2,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "印刷",
    //       mean: "In ấn",
    //       example: "この本は印刷 がきれいだ",
    //       exampleMean: "Cuốn sách này được in đẹp",
    //       imgUrl:
    //         "http://thhoangvanthu-hm.edu.vn/upload/29378/fck/files/22.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-18",
    //     },
    //     {
    //       cardId: 3,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "画面",
    //       mean: "Màn hình",
    //       example: "画面,真っ黒 だよ！TV 壊れちゃったの？",
    //       exampleMean: "Màn hình đen kịt rồi! Có phải TV bị hỏng không?",
    //       imgUrl:
    //         "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-18",
    //     },
    //     {
    //       cardId: 4,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "印刷",
    //       mean: "In ấn",
    //       example: "この本は印刷 がきれいだ",
    //       exampleMean: "Cuốn sách này được in đẹp",
    //       imgUrl:
    //         "http://thhoangvanthu-hm.edu.vn/upload/29378/fck/files/22.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-18",
    //     },
    //     {
    //       cardId: 5,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "画面",
    //       mean: "Màn hình",
    //       example: "画面,真っ黒 だよ！TV 壊れちゃったの？",
    //       exampleMean: "Màn hình đen kịt rồi! Có phải TV bị hỏng không?",
    //       imgUrl:
    //         "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-19",
    //     },
    //     {
    //       cardId: 6,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "印刷",
    //       mean: "In ấn",
    //       example: "この本は印刷 がきれいだ",
    //       exampleMean: "Cuốn sách này được in đẹp",
    //       imgUrl:
    //         "http://thhoangvanthu-hm.edu.vn/upload/29378/fck/files/22.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-19",
    //     },
    //     {
    //       cardId: 7,
    //       onSound: "がぞう",
    //       kunSound: "がぞう",
    //       chineseSound: "がぞう",
    //       term: "印刷",
    //       mean: "In ấn",
    //       example: "この本は印刷 がきれいだ",
    //       exampleMean: "Cuốn sách này được in đẹp",
    //       imgUrl:
    //         "http://thhoangvanthu-hm.edu.vn/upload/29378/fck/files/22.jpg",
    //       trick: "がぞう",
    //       flashcardSetId: 1,
    //       status: 2,
    //       createAt: "2023-11-19",
    //     },
    //   ]);
    //   setLoading(false);
    // }, 1000);
  }, [setId, importing]);

  const addCard = async (newCard, handleToggleForm) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const url = isKanjiCard(newCard)
        ? "/card/kanji-card"
        : isGrammarCard(newCard)
        ? "/card/grammar-card"
        : "/card/vocab-card";
      const response = await axios.post(url, JSON.stringify(newCard), config);
      // const newCardBank = cardBank.unshift(response.data);
      // setCardBank(newCardBank);
      await getBankCard();
      handleToggleForm();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      handleToggleForm();
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const updateCard = async (newCard, handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const url = isKanjiCard(newCard)
        ? "/card/kanji-card"
        : isGrammarCard(newCard)
        ? `/card/grammar-card/${newCard.cardId}`
        : "/card/vocab-card";
      const response = await axios.put(url, JSON.stringify(newCard), config);
      const newCardBank = cardBank.map((card) =>
        card.cardId === newCard.cardId &&
        getCardType(card) === getCardType(newCard)
          ? newCard
          : card
      );
      setCardBank(newCardBank);
      handleToggle();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      handleToggle();
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteCard = async (card, handleToggle) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const url = isKanjiCard(card)
        ? `/card/kanji-card/${card.cardId}`
        : isGrammarCard(card)
        ? `/card/grammar-card/${card.cardId}`
        : `/card/vocab-card/${card.cardId}`;
      await axios.delete(url, config);
      const newCardBank = cardBank.filter((c) => c.cardId !== card.cardId);
      setCardBank(newCardBank);
      handleToggle();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const importFile = async (files, handleToggle, setAlert) => {
    if (!files) {
      setAlert({
        open: true,
        severity: "error",
        message: "File không tồn tại",
      });
      return;
    }

    const file = files[0];
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setAlert({
        open: true,
        severity: "error",
        message: "Chỉ nhận định dạng file excel",
      });
      return console.log("Chỉ nhận định dạng file excel");
    }
    if (file.size >= 1 * 1024 * 1024) {
      setAlert({
        open: true,
        severity: "error",
        message:
          "Bạn không nên nhập quá nhiều thẻ trong một bộ! Tối đa 1000 thẻ. File size max 1MB",
      });
      return;
    }
    const reader = new FileReader();
    setImporting(true);
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);
      try {
        const importType = isImportKanji(json[0])
          ? 1
          : isImportGrammar(json[0])
          ? 3
          : isImportVoca(json[0])
          ? 2
          : () => {
              throw Error();
            };
        // Modify the JSON keys as needed
        const jsonParsed =
          importType === 1
            ? parseKanjiExcel(json)
            : importType === 3
            ? parseGrammaExcel(json)
            : parseVocaExcel(json);

        // console.log(jsonParsed);

        // gui ve backend

        const config = {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const url =
          importType === 1
            ? `/card/kanji-card/import`
            : importType === 2
            ? `/card/vocab-card/import`
            : `/card/grammar-card/import`;
        // Gửi yêu cầu post để thêm mới dữ liệu
        const response = await axios.post(
          url,
          JSON.stringify(jsonParsed),
          config
        );

        setImporting(false);
      } catch (error) {
        setImporting(false);

        setAlert({
          open: true,
          severity: "error",
          message:
            error.response?.data?.errors?.body[0] ||
            "Nhập không thành công vui lòng đổi tên cột giống trong file mẫu",
        });
      }
    };
    reader.readAsArrayBuffer(files[0]);
    handleToggle();
  };

  return {
    cardBank,
    loading,
    mutationing,
    importing,
    importFile,
    deleteCard,
    updateCard,
    addCard,
  };
};

export default useLibCardBank;
