import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useParams } from "react-router-dom";
import { StackList } from "./Styled/StyledStack";
import ReadCard from "./Cards/ReadCard";
import FlipCard from "./Cards/FlipCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import completeCup from "../assets/images/completeCup.png";

const LearnSetWidget = ({ indexCard, learnList }) => {
  const { flashcardSet, handleToggleSelectCard, mutation, logStudiedCard } =
    useFlashcardSetContext();
  const { setId } = useParams();

  const [currentCard, setCurrentCard] = useState(indexCard);
  const [done, setDone] = useState(false);
  const handlePrev = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };
  const handleNext = () => {
    if (!mutation) {
      logStudiedCard(learnList[currentCard]);
      if (currentCard < learnList.length - 1) setCurrentCard(currentCard + 1);
      if (currentCard === learnList.length - 1) setDone(true);
      // console.log(learnList[currentCard]);
    }
  };

  const handleKeyDown = (event) => {
    if (mutation) return;
    switch (event.key) {
      // case 'ArrowUp':
      //   setMessage('Đã nhấn phím mũi tên lên');
      //   // Thực hiện các hành động tương ứng
      //   break;
      // case 'ArrowDown':
      //   setMessage('Đã nhấn phím mũi tên xuống');
      //   // Thực hiện các hành động tương ứng
      //   break;
      case "ArrowLeft":
        handlePrev();
        // Thực hiện các hành động tương ứng
        break;
      case "ArrowRight":
        handleNext();
        // Thực hiện các hành động tương ứng
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện nhấn phím khi component được render
    document.addEventListener("keydown", handleKeyDown);

    // Hủy lắng nghe sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <StackList sx={{ p: 1, borderBottom: "1px solid rgba(0,0,0,0.25)" }}>
        <Box flex={1}>
          <Tooltip title={"Quay lại"}>
            <IconButton LinkComponent={Link} to={`/${setId}/read`} size="large">
              <ArrowBackIosIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Stack>
          <Typography sx={{ textAlign: "center" }}>
            {currentCard + 1 + "/" + learnList.length}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            {flashcardSet.title}
          </Typography>
        </Stack>
        <Stack flex={1} alignItems={"flex-end"}>
          <Tooltip title={"Quay lại"}>
            <IconButton
              LinkComponent={Link}
              to={`/${setId}/read`}
              sx={{
                width: 50,
                height: 50,
                textAlign: "center",
                verticalAlign: "center",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </StackList>
      <LinearProgress
        variant="determinate"
        value={(currentCard / (learnList.length - 1)) * 100}
      />
      <Stack p={3} pr={16} pl={16}>
        {done ? (
          <>
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              rowGap={"10px"}
            >
              <Typography>Chúc mừng bạn đã hoàn thành lần học này</Typography>
              <Box width={"450px"} height={"300px"}>
                <img src={completeCup} alt="Congratulation" />
              </Box>
              <Button
                LinkComponent={Link}
                to={`/${setId}/read`}
                variant="outlined"
              >
                Quay lại
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <FlipCard
              card={learnList[currentCard]}
              onSeclectCard={handleToggleSelectCard}
            />
            <StackList justifyContent={"center"} sx={{ gap: 10 }}>
              <Box sx={{ width: 50, height: 50 }}>
                <IconButton onClick={handlePrev}>
                  <ArrowBackIcon />
                </IconButton>
              </Box>
              <Box sx={{ width: 50, height: 50 }}>
                <IconButton onClick={handleNext} disabled={mutation}>
                  <ArrowBackIcon sx={{ transform: "rotateY(180deg)" }} />
                </IconButton>
              </Box>
            </StackList>
          </>
        )}
      </Stack>
    </>
  );
};

export default LearnSetWidget;
