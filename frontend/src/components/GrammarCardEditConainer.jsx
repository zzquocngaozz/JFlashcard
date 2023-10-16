import React, { useCallback, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BackdropLoading from "./FeedBack/BackdropLoading";
import searhbanner from "../assets/images/searhbanner.png";
import KanjiDialogForm from "./Dialog/KanjiDialogForm";
import KanjiCardEdit from "./Cards/KanjiCardEdit";
import GrammarCardEdit from "./Cards/GrammarCardEdit";
import GrammarDialogForm from "./Dialog/GrammarDialogForm";
// TODO: create hook get list kanji
const GrammarCardEditConainer = () => {
  const [data, setData] = useState([
    {
      cardGrammarId: 1,
      combination: "[Ｎ＋において]",
      note: "あし",
      term: "〜において／〜における",
      mean: "Tại, ở (chỉ địa điểm)",
      example:
        "ウェルカムパーティーはさくら公園において行(おこな)われる予定です.",
      exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
      imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
      flashcardSetId: 123,
    },
    {
      cardGrammarId: 2,
      combination: "[V-テ形・ナイ形ないで＋ほしい］",
      note: "あし",
      term: "〜てほしい／〜てもらいたい",
      mean: "Tại, ở (chỉ địa điểm)",
      example:
        "ウェルカムパーティーはさくら公園において行(おこな)われる予定です。",
      exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
      imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
      flashcardSetId: 123,
    },
    {
      cardGrammarId: 3,
      combination: "[Ｎ＋において]",
      note: "あし",
      term: "〜において／〜における",
      mean: "Tại, ở (chỉ địa điểm)",
      example:
        "ウェルカムパーティーはさくら公園において行(おこな)われる予定です。",
      exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
      imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
      flashcardSetId: 123,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
    console.log("toggle");
  }, [openForm]);

  const addGrammar = (d) => {
    const newData = [...data, d];
    setData(newData);
    console.log(typeof data);
    console.log(d);
    handleToggleForm();
  };
  const updateGrammar = (d) => {
    const newData = data.map((card) =>
      card.cardGrammarId === d.cardGrammarId ? d : card
    );
    setData(newData);
  }

  const deleteGrammar = (cardId)=>{
    console.log('delete ',cardId)
  }
  console.log(!data);
  return (
    <Stack>
      {loading ? (
        <BackdropLoading />
      ) : data.length === 0 ? (
        <Stack minHeight={150} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img
              src={searhbanner}
              loading="lazy"
              alt="notfound"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
          <Typography textAlign={"center"}>
            Chưa có thẻ nào trong bộ của bạn
          </Typography>
        </Stack>
      ) : (
        data.map((card, index) => (
          <GrammarCardEdit key={index} index={index} card={card} updateCard={updateGrammar} deleteCard={deleteGrammar}/>
        ))
      )}
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{ borderRadius: "15px" }}
        onClick={handleToggleForm}
      >
        Thêm thẻ ngữ pháp
      </Button>
      {openForm ? (
        <GrammarDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addGrammar}
        />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default GrammarCardEditConainer;
