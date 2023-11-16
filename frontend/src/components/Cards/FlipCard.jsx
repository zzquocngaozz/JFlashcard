import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import placeholder from "../../assets/images/placeholder.png";
import StarIcon from "@mui/icons-material/Star";
import useAuth from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { StackList } from "../Styled/StyledStack";
import CustomTextSpeaker from "../DataDisplay/CustomTextSpeaker";

const FlipCard = ({ card }) => {
  const { isLogin } = useAuth();
  const { markedCards, handleToggleSelectCard: onSeclectCard } =
    useFlashcardSetContext();
  const [selected, setSelected] = useState(false);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    setSelected(markedCards?.includes(card));
  }, [card]);

  const handleToggleFlip = () => {
    setFlip(!flip);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(!selected);
    onSeclectCard(card?.cardId);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        handleToggleFlip();
        // Thực hiện các hành động tương ứng
        break;
      case "ArrowDown":
        handleToggleFlip();
        // Thực hiện các hành động tương ứng
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setFlip(false);
  }, [card]);
  useEffect(() => {
    // Lắng nghe sự kiện nhấn phím khi component được render
    document.addEventListener("keydown", handleKeyDown);
    // Hủy lắng nghe sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Stack
      className={`card  ${flip ? "flip" : ""}`}
      sx={{
        width: "100%",
        height: "70vh",
        m: "10px 0",
        position: "relative",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "1px 2px 10px -1px rgba(0, 0, 0, 0.25)",
        overflow: "none",
        overflowy: "scroll",
      }}
      onClick={handleToggleFlip}
    >
      <Stack
        className="front-side"
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Typography variant="h3" component={"p"}>
          {card?.term}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 30,
            width: 1,
          }}
        >
          <Tooltip title={`${card?.mean?.slice(0, 3)}.................`}>
            <IconButton onClick={handleSelect}>
              <LightbulbIcon sx={{ color: "#ff9800" }} />
            </IconButton>
          </Tooltip>
        </Box>
        {isLogin() ? (
          <StackList
            sx={{
              position: "absolute",
              top: 10,
              right: 30,
            }}
          >
            <CustomTextSpeaker text={card?.term} toolTitle={"Đọc thuật ngữ"} />
            <Tooltip title={`${!selected ? "Chọn" : "Bỏ chọn"}`}>
              <IconButton onClick={handleSelect}>
                <StarIcon sx={{ color: `${selected ? "#ff9800" : ""}` }} />
              </IconButton>
            </Tooltip>
          </StackList>
        ) : (
          <></>
        )}
      </Stack>

      <Stack
        className="back-side"
        spacing={1}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: "80%",
            height: "100%",
            padding: 1,
            justifyContent: "space-evenly",
          }}
        >
          {!!card?.chineseSound ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Ý nghĩa:
              </Typography>
              <Typography>
                <span className="text--up">{card?.chineseSound}</span> -{" "}
                {card?.mean}
              </Typography>
            </Stack>
          ) : (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Ý nghĩa:
              </Typography>
              <Typography>{card?.mean}</Typography>
            </Stack>
          )}
          {!!card?.chineseSound ? (
            <Stack sx={{ gap: 10, flexDirection: "row" }}>
              <Stack width={"40%"}>
                <Typography variant="span" sx={{ fontWeight: 500 }}>
                  Âm on:
                </Typography>
                <Typography>{card?.onSound}</Typography>
              </Stack>
              <Stack width={"40%"}>
                <Typography variant="span" sx={{ fontWeight: 500 }}>
                  Âm kun:
                </Typography>
                <Typography>{card?.kunSound}</Typography>
              </Stack>
            </Stack>
          ) : (
            <></>
          )}
          {!!card?.trick ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Mẹo nhớ:
              </Typography>
              <Typography>{card?.trick}</Typography>
            </Stack>
          ) : (
            <></>
          )}
          {!!card?.combination ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Cách chia:
              </Typography>
              <Typography>{card?.combination}</Typography>
            </Stack>
          ) : (
            <></>
          )}
          {!!card?.note ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Lưu ý
              </Typography>
              <Typography>{card?.note}</Typography>
            </Stack>
          ) : (
            <></>
          )}
          {!!card?.example || !!card?.exampleMean ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Ví dụ:
              </Typography>
              <Typography>{card?.example}</Typography>
              <Typography>{card?.exampleMean}</Typography>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
        {!!card?.imgUrl ? (
          <Box sx={{ width: 150, height: 150 }}>
            <img
              src={card?.imgUrl}
              onError={(e) => {
                e.target.src = placeholder;
              }}
              alt="hint"
            />
          </Box>
        ) : (
          <></>
        )}
        {isLogin() ? (
          <StackList
            sx={{
              position: "absolute",
              top: 5,
              right: 20,
            }}
          >
            {!!card?.example ? (
              <CustomTextSpeaker text={card?.example} toolTitle={"Đọc ví dụ"} />
            ) : (
              <></>
            )}
            <Tooltip title={`${!selected ? "Chọn" : "Bỏ chọn"}`}>
              <IconButton onClick={handleSelect}>
                <StarIcon sx={{ color: `${selected ? "#ff9800" : ""}` }} />
              </IconButton>
            </Tooltip>
          </StackList>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default React.memo(FlipCard);
