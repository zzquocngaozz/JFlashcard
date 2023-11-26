import React, { useCallback, useState } from "react";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import searhbanner from "../assets/images/searhbanner.png";
import KanjiDialogForm from "./Dialog/KanjiDialogForm";
import { useInitSetCardContext } from "../context/SetEditContext";
import VocaDialogForm from "./Dialog/VocaDialogForm";
import GrammarDialogForm from "./Dialog/GrammarDialogForm";
import AddCardDialog from "./Dialog/AddCardDialog";
import CardSetEdit from "./Cards/CardSetEdit";
import useAuth from "../hooks/useAuth";
// TODO: create hook get list kanji
const CardEditContainer = () => {
  const [openForm, setOpenForm] = useState(false);
  const { currentUser } = useAuth();
  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const { dataSet, cardList, loading, importing } = useInitSetCardContext();

  // const { kanjiList, loading, mutationing, addCard, updateCard, deleteCard } =
  //   useKanjiCardEdit({ handleToggleForm, importing });

  return (
    <Stack>
      {currentUser.role === 4 ||
      (currentUser.role === 2 && dataSet.status === 3) ? (
        <></>
      ) : dataSet?.type === 1 ? (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: "15px" }}
          onClick={handleToggleForm}
        >
          Thêm thẻ hán tự
        </Button>
      ) : dataSet?.type === 2 ? (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: "15px" }}
          onClick={handleToggleForm}
        >
          Thêm thẻ từ vựng
        </Button>
      ) : dataSet?.type === 3 ? (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: "15px" }}
          onClick={handleToggleForm}
        >
          Thêm thẻ ngữ pháp
        </Button>
      ) : (
        <></>
      )}
      {loading || importing ? (
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
      ) : cardList.length === 0 ? (
        <Stack minHeight={150} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img src={searhbanner} loading="lazy" alt="notfound" />
          </Box>
          <Typography textAlign={"center"}>
            Chưa có thẻ nào trong học phần
          </Typography>
        </Stack>
      ) : (
        cardList.map((card, index) => (
          <CardSetEdit key={index} index={index} card={card} />
        ))
      )}

      {/* {openForm && dataSet?.type === 1 ? (
        <KanjiDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addCard}
          mutationing={mutationing}
        />
      ) : openForm && dataSet?.type === 2 ? (
        <VocaDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addCard}
          mutationing={mutationing}
        />
      ) : openForm && dataSet?.type === 3 ? (
        <GrammarDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addCard}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )} */}
      {openForm ? <AddCardDialog handleToggle={handleToggleForm} /> : <></>}
    </Stack>
  );
};

export default CardEditContainer;
