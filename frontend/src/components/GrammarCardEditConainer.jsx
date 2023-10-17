import React, { useCallback, useState } from "react";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BackdropLoading from "./FeedBack/BackdropLoading";
import searhbanner from "../assets/images/searhbanner.png";
import GrammarCardEdit from "./Cards/GrammarCardEdit";
import GrammarDialogForm from "./Dialog/GrammarDialogForm";
import useGrammarCardEdit from "../hooks/useGrammarCardEdit";
// TODO: create hook get grammar list
const GrammarCardEditConainer = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
    console.log("toggle");
  }, [openForm]);

  const { grammarList, loading, mutationing, addCard, updateCard, deleteCard } =
    useGrammarCardEdit({ handleToggleForm });

  return (
    <Stack>
      {loading ?(
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "50px",
              borderRadius: "20px",
              margin: "10px 10px 10px 0",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ height: "100px", borderRadius: "20px", margin: "10px 0" }}
          />
        </Box>
      )  : grammarList.length === 0 ? (
        <Stack minHeight={150} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img
              src={searhbanner}
              loading="lazy"
              alt="notfound"
            />
          </Box>
          <Typography textAlign={"center"}>
            Chưa có thẻ nào trong bộ của bạn
          </Typography>
        </Stack>
      ) : (
        grammarList.map((card, index) => (
          <GrammarCardEdit
            key={index}
            index={index}
            card={card}
            updateCard={updateCard}
            deleteCard={deleteCard}
          />
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
        <GrammarDialogForm handleToggle={handleToggleForm} onSubmit={addCard} />
      ) : (
        <></>
      )}
      {mutationing?<BackdropLoading/>:<></>}
    </Stack>
  );
};

export default GrammarCardEditConainer;

// const [data, setData] = useState([
//   {
//     cardGrammarId: 1,
//     combination: "[Ｎ＋において]",
//     note: "あし",
//     term: "〜において／〜における",
//     mean: "Tại, ở (chỉ địa điểm)",
//     example:
//       "ウェルカムパーティーはさくら公園において行(おこな)われる予定です.",
//     exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
//     imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
//     flashcardSetId: 123,
//   },
//   {
//     cardGrammarId: 2,
//     combination: "[V-テ形・ナイ形ないで＋ほしい］",
//     note: "あし",
//     term: "〜てほしい／〜てもらいたい",
//     mean: "Tại, ở (chỉ địa điểm)",
//     example:
//       "ウェルカムパーティーはさくら公園において行(おこな)われる予定です。",
//     exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
//     imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
//     flashcardSetId: 123,
//   },
//   {
//     cardGrammarId: 3,
//     combination: "[Ｎ＋において]",
//     note: "あし",
//     term: "〜において／〜における",
//     mean: "Tại, ở (chỉ địa điểm)",
//     example:
//       "ウェルカムパーティーはさくら公園において行(おこな)われる予定です。",
//     exampleMean: "Tiệc chào mừng thì dự kiến tổ chức ở công viên sakura",
//     imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
//     flashcardSetId: 123,
//   },
// ]);
