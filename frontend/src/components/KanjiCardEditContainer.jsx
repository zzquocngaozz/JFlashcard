import React, { useCallback, useState } from "react";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BackdropLoading from "./FeedBack/BackdropLoading";
import searhbanner from "../assets/images/searhbanner.png";
import KanjiDialogForm from "./Dialog/KanjiDialogForm";
import KanjiCardEdit from "./Cards/KanjiCardEdit";
import useKanjiCardEdit from "../hooks/useKanjiCardEdit";
// TODO: create hook get list kanji
const KanjiCardEditContainer = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
    console.log("toggle");
  }, [openForm]);

  const { kanjiList, loading, mutationing, addCard, updateCard, deleteCard } =
    useKanjiCardEdit({ handleToggleForm });

  return (
    <Stack>
      {loading ? (
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
      ) : kanjiList.length === 0 ? (
        <Stack minHeight={150} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img src={searhbanner} loading="lazy" alt="notfound" />
          </Box>
          <Typography textAlign={"center"}>
            Chưa có thẻ nào trong bộ của bạn
          </Typography>
        </Stack>
      ) : (
        kanjiList.map((card, index) => (
          <KanjiCardEdit
            key={index}
            index={index}
            card={card}
            onUpdate={updateCard}
            onDelete={deleteCard}
          />
        ))
      )}
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{ borderRadius: "15px" }}
        onClick={handleToggleForm}
      >
        Thêm thẻ hán tự
      </Button>
      {openForm ? (
        <KanjiDialogForm handleToggle={handleToggleForm} onSubmit={addCard} />
      ) : (
        <></>
      )}
      {mutationing ? <BackdropLoading /> : <></>}
    </Stack>
  );
};

export default KanjiCardEditContainer;
// const kanjiList = useState([{
//   cardKanjiId: 1,
//   onSound: "そく",
//   kunSound: "あし",
//   chineseSound: "Túc",
//   term: "足",
//   trick: 'Chân(足) không đủ(不足) dài để chạy',
//   mean: "Đầy đủ, chân",
//   example: "1万円じゃ不足よ",
//   exampleMean: "1 man là không đủ đâu",
//   imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
//   flashcardSetId: 123
// },{
// cardKanjiId: 2,
// onSound: "そく",
// kunSound: "あし",
// chineseSound: "Túc",
// trick: 'Chân(足) không đủ(不足) dài để chạy',
// term: "足",
// mean: "Đầy đủ, chân",
// example: "1万円じゃ不足よ",
// exampleMean: "1 man là không đủ đâu",
// imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
// flashcardSetId: 123
// },
// {
// cardKanjiId: 2,
// onSound: "そく",
// kunSound: "あし",
// chineseSound: "Túc",
// trick: 'Chân(足) không đủ(不足) dài để chạy',
// term: "足",
// mean: "Đầy đủ, chân",
// example: "1万円じゃ不足よ",
// exampleMean: "1 man là không đủ đâu",
// imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
// flashcardSetId: 123
// }

// ])
