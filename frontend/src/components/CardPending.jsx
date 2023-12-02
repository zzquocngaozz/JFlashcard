import React, { useState } from "react";
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
import BackdropLoading from "./FeedBack/BackdropLoading";
import SaveIcon from "@mui/icons-material/Save";
import SnapBarAlter from "./FeedBack/SnapBarAlter";
import AlertCloneSet from "./Dialog/AlertCloneSet";
import CloneCardMenu from "./Menu/CloneCardMenu";
import { dateRangeFormat, parseBirth } from "../utils/datetimeCalc";

const CardPending = () => {
  const { flashcardSet } = useFlashcardSetContext();
  const navigate = useNavigate();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();

  return (
    <Stack
      // pr={4}
      // pl={4}
      sx={{
        columnGap: "30px",
        rowGap: "20px",
        borderBottom: "1px solid rgba(0,0,0,0.25)",
      }}
      className="container__theme"
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
          </Stack>
        </Stack>
        <Stack>
          <Tooltip title={`${flashcardSet?.numberVote} người đã đánh giá`}>
            <StackList>
              <StarIcon sx={{ color: "#ff9800" }} />
              <Typography>
                {flashcardSet?.votePoint + " "}({flashcardSet?.numberVote})
              </Typography>
            </StackList>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography variant="h3">Học phần chưa được mở</Typography>
        <Typography variant="h2">
          Hãy đợi đến {dateRangeFormat(flashcardSet?.publicAt)}
        </Typography>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Quay lại
        </Button>
      </Stack>
      <Stack pb={3} flexDirection={"row"}>
        <StackList flex={3}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: `${getColorFromEnum(
                flashcardSet?.authDTO?.userName[0]
              )}`,
            }}
          >
            {flashcardSet?.authDTO?.userName.toUpperCase()[0]}
          </Avatar>
          <Typography>{flashcardSet?.authDTO?.userName + " "}</Typography>
          <Chip label={ROLE[flashcardSet?.authDTO?.role]} width={50} />
        </StackList>
        {isLogin() && currentUser?.userId === flashcardSet?.authDTO?.userId ? (
          <Tooltip title={"Chỉnh sửa"}>
            <IconButton
              LinkComponent={Link}
              to={`/${flashcardSet.flashcardSetId}/edit`}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default React.memo(CardPending);
