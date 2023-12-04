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
import { useEffect, useState } from "react";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";

const ReadCard = ({ card, index, onSeclectCard }) => {
  const { isLogin } = useAuth();
  const { markedCards, mutation } = useFlashcardSetContext();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(markedCards?.includes(card));
  }, [markedCards]);
  return (
    <Stack
      className="set-card"
      bgcolor={"#fff"}
      m={"10px 0"}
      borderRadius={"8px"}
      height={320}
      width={"100%"}
      sx={{
        boxShadow: "1px 2px 5px -1px rgba(0, 0, 0, 0.25)",
        overflowY: "scroll",
      }}
      // overflow={"none"}
    >
      <Stack
        flexDirection={"row"}
        height={"100%"}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack
          flex={2}
          height={"100%"}
          p={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6" component={"p"}>
            {card?.term}
          </Typography>
        </Stack>

        <Stack
          flex={7}
          className="backside-card"
          minHeight={"100%"}
          p={2}
          position={"relative"}
          justifyContent={"flex-start"}
          sx={{
            rowGap: "10px",
            "& p": { maxWidth: "calc(100% - 160px)" },
          }}
          // spacing={1}
        >
          {!!card.chineseSound ? (
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
            <>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Ý nghĩa:
              </Typography>
              <Typography>{card?.mean}</Typography>
            </>
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
          <Box
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 150,
              height: 150,
            }}
          >
            {!!card?.imgUrl ? (
              <img
                src={card?.imgUrl}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
                alt="hint"
              />
            ) : (
              <></>
            )}
          </Box>
          {isLogin() ? (
            <Box
              sx={{
                position: "absolute",
                top: 5,
                right: 20,
              }}
              display={!mutation}
            >
              <Tooltip title={`${!selected ? "Chọn" : "Bỏ chọn"}`}>
                <IconButton
                  onClick={() => {
                    setSelected(!selected);
                    onSeclectCard(card?.cardId);
                  }}
                >
                  <StarIcon sx={{ color: `${selected ? "#ff9800" : ""}` }} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReadCard;
