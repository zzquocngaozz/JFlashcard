import React, { useCallback, useState } from "react";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BackdropLoading from "./FeedBack/BackdropLoading";
import searhbanner from "../assets/images/searhbanner.png";
import GrammarCardEdit from "./Cards/GrammarCardEdit";
import GrammarDialogForm from "./Dialog/GrammarDialogForm";
import useGrammarCardEdit from "../hooks/useGrammarCardEdit";
// TODO: create hook get grammar list
const GrammarCardEditConainer = ({importing}) => {
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const { grammarList, loading, mutationing, addCard, updateCard, deleteCard } =
    useGrammarCardEdit({ handleToggleForm,importing });

  return (
    <Stack>
      {loading ||importing?(
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
            mutationing={mutationing}
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
        <GrammarDialogForm handleToggle={handleToggleForm} onSubmit={addCard} mutationing={mutationing} />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default GrammarCardEditConainer;

