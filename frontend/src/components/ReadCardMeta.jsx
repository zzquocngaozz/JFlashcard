import React from "react";
import FlashcardBookMark from "./DataDisplay/FlashcardBookMark";
import SetVote from "./Menu/SetVote";
import { StackList } from "./Styled/StyledStack";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ShowMoreText from "./DataDisplay/ShowMoreText";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { ROLE, SET_TYPE } from "../utils/constant";
import { getColorFromEnum } from "../utils/colorGetter";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

const ReadCardMeta = () => {
  const { flashcardSet, remain, learnedCards, markedCards } =
    useFlashcardSetContext();
  const navigate = useNavigate();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();

  const setLearnMode = (url, learnMode) => {
    // Chuyển đến trang Page B và truyền state thông qua props.location.state
    navigate(url, { state: { learnMode } });
  };

  return (
    <Stack
      // pr={4}
      // pl={4}
      sx={{
        columnGap: "30px",
        rowGap: "20px",
        borderBottom: "1px solid rgba(0,0,0,0.25)",
      }}
      // className="container__theme"
    >
      <Stack sx={{ columnGap: "30px", flexDirection: "row" }}>
        <Stack flex={3} sx={{ gap: 2 }}>
          <Typography variant="h5">{flashcardSet?.title}</Typography>
          <ShowMoreText maxLength={100}>
            {flashcardSet?.description}
          </ShowMoreText>
          <Stack sx={{ flexDirection: "row", gap: 1, width: 200 }}>
            <Chip
              label={SET_TYPE[flashcardSet?.type]}
              // color="info"
              variant="contained"
              sx={{ mr: 1 }}
            />
            {flashcardSet?.private ? (
              <Chip
                label={"Riêng tư"}
                // color="default"
                variant="contained"
              />
            ) : (
              <Chip
                label={"Công khai"}
                // color="secondary"
                variant="contained"
              />
            )}
          </Stack>
        </Stack>
        <Stack>
          {!isLogin() ? (
            <Tooltip title={`${flashcardSet.numberVote} người đã đánh giá`}>
              <StackList>
                <StarIcon sx={{ color: "#ff9800" }} />
                <Typography>
                  {flashcardSet?.votePoint + " "}({flashcardSet?.numberVote})
                </Typography>
              </StackList>
            </Tooltip>
          ) : (
            <StackList>
              <SetVote />
              <FlashcardBookMark />
            </StackList>
          )}
        </Stack>
      </Stack>
      {isLogin() ? (
        <StackList>
          {learnedCards?.length === 0 ? (
            <Button
              sx={{ textTransform: "none", borderRadius: "20px" }}
              variant="contained"
              onClick={() => {
                setLearnMode(`/${setId}/flashcard`, 0);
              }}
            >
              Học bộ này
            </Button>
          ) : learnedCards?.length >= 0 && remain?.length !== 0 ? (
            <>
              <Button
                sx={{ textTransform: "none", borderRadius: "20px" }}
                variant="contained"
                onClick={() => {
                  setLearnMode(`/${setId}/flashcard`, 0);
                }}
              >
                Học từ đầu
              </Button>
              <Button
                sx={{ textTransform: "none", borderRadius: "20px" }}
                variant="contained"
                onClick={() => {
                  setLearnMode(`/${setId}/flashcard`, 1);
                }}
              >
                Học tiếp
              </Button>
            </>
          ) : (
            <Button
              sx={{ textTransform: "none", borderRadius: "20px" }}
              variant="contained"
              onClick={() => {
                setLearnMode(`/${setId}/flashcard`, 0);
              }}
            >
              Ôn tập
            </Button>
          )}
          {markedCards?.length !== 0 ? (
            <Button
              sx={{ textTransform: "none", borderRadius: "20px" }}
              variant="contained"
              color="warning"
              onClick={() => {
                setLearnMode(`/${setId}/flashcard`, 2);
              }}
            >
              Học thẻ đã đánh dấu
            </Button>
          ) : (
            <></>
          )}
        </StackList>
      ) : (
        <></>
      )}
      <Stack pb={3} flexDirection={"row"}>
        <StackList flex={3}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: `${getColorFromEnum(
                flashcardSet?.authoDTO?.userName[0]
              )}`,
            }}
          >
            {flashcardSet.authoDTO?.userName.toUpperCase()[0]}
          </Avatar>
          <Typography>{flashcardSet.authoDTO.userName + " "}</Typography>
          <Chip label={ROLE[flashcardSet.authoDTO.role]} width={50} />
        </StackList>
        {isLogin() && currentUser.userId === flashcardSet.authoDTO.userId ? (
          <Tooltip title={"Chỉnh sửa"}>
            <IconButton
              LinkComponent={Link}
              to={`/${flashcardSet.flashcardSetId}/edit`}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        ) : isLogin() ? (
          <Tooltip title={"Lưu và sửa"}>
            <IconButton
              onClick={() => {
                console.log("clicked");
              }}
            >
              <FilterNoneIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default ReadCardMeta;
