import {
  Alert,
  AlertTitle,
  Button,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import { Link } from "react-router-dom";
import { StackList } from "./Styled/StyledStack";
import ReadCard from "./Cards/ReadCard";
import useAuth from "../hooks/useAuth";

const GuestCardContainer = () => {
  const { flashcardSet } = useFlashcardSetContext();
  const { isLogin } = useAuth();
  return (
    <Stack
      sx={{
        "& .backside-card": {
          filter: "blur(2px)",
        },
      }}
    >
      <Typography variant="h5" mt={2} mb={2}>
        Có {flashcardSet.cards.length} thẻ trong bộ này
      </Typography>
      {flashcardSet.cards?.map((card, index) => (
        <ReadCard
          key={card.cardId}
          index={index}
          card={card}
          onSeclectCard={(cardId) => {
            console.log(cardId);
          }}
        />
      ))}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!isLogin()}
        message="I love snacks"
        key={"bottomcenter"}
      >
        <Alert severity="warning" variant="outlined" sx={{ bgcolor: "#fff" }}>
          <AlertTitle>Thông báo của hệ thống</AlertTitle>
          <StackList
            min-width={300}
            height={100}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"row"}
          >
            <Typography>
              Đăng ký tài khoàn để xem hết và học bộ này —{" "}
            </Typography>
            <Link to={"/signup"}>
              <Typography variant="h6" component={"strong"}>
                Đăng ký ngay !
              </Typography>
            </Link>
          </StackList>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default GuestCardContainer;
