import React, { useCallback, useState } from "react";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import searhbanner from "../assets/images/searhbanner.png";
import VocaCardEdit from "./Cards/VocaCardEdit";
import VocaDialogForm from "./Dialog/VocaDialogForm";
import useVocaCardEdit from "../hooks/useVocaCardEdit";
// TODO: create hook get list kanji
const VocaCardEditContainer = ({ importing }) => {
  //     const [data,setData] = useState([{
  //       cardVocabId: 1,
  //       term: "足",
  //       mean: "Chân",
  //       example: "足が痛いんです",
  //       exampleMean: "Chân tôi đau á",
  //       imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
  //       flashcardSetId: 123
  //   },{
  //     cardVocabId: 2,
  //     term: "足",
  //     mean: "Chân",
  //     example: "足が痛いんです",
  //     exampleMean: "Chân tôi đau á",
  //     imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
  //     flashcardSetId: 123
  // },{
  //   cardVocabId: 3,
  //   term: "足",
  //   mean: "Chân",
  //   example: "足が痛いんです",
  //   exampleMean: "Chân tôi đau á",
  //   imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
  //   flashcardSetId: 123
  // },
  //   ])
  // const [loading,setLoading] = useState(false)
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const { vocaList, loading, mutationing, addCard, updateCard, deleteCard } =
    useVocaCardEdit({ handleToggleForm, importing });

  return (
    <Stack>
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
      ) : vocaList.length === 0 ? (
        <Stack minHeight={150} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img src={searhbanner} loading="lazy" alt="notfound" />
          </Box>
          <Typography textAlign={"center"}>
            Chưa có thẻ nào trong bộ của bạn
          </Typography>
        </Stack>
      ) : (
        vocaList.map((card, index) => (
          <VocaCardEdit
            key={index}
            index={index}
            card={card}
            onUpdate={updateCard}
            onDelete={deleteCard}
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
        Thêm thẻ từ vựng
      </Button>
      {openForm ? (
        <VocaDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addCard}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default VocaCardEditContainer;
