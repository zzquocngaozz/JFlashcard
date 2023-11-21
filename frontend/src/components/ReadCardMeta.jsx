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

const ReadCardMeta = () => {
  const {
    flashcardSet,
    remain,
    cloning,
    learnedCards,
    markedCards,
    cloneSet,
    alert,
    handleCloseSnackBar,
  } = useFlashcardSetContext();
  const navigate = useNavigate();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();

  const [alertClone, setAlertClone] = useState({
    open: false,
    mode: 0,
    message: "Bạn có muốn sao chép toàn bộ thẻ trong bộ này",
  });

  const handleTogleClone = (mode) => {
    console.log(mode);
    if (mode === 0)
      setAlertClone({
        mode: 0,
        message: "Bạn có muốn sao chép những thẻ trong bộ này",
        open: true,
      });
    else
      setAlertClone({
        open: true,
        mode: 1,
        message: "Bạn có muốn sao chép những thẻ đã được chọn",
      });
  };

  const handleToggleAlert = () => {
    setAlertClone({ ...alertClone, open: !alertClone.open });
  };

  const handleClone = (mode) => {
    cloneSet(mode, handleToggleAlert);
  };

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
          </Stack>
        </Stack>
        <Stack>
          {!isLogin() ? (
            <Tooltip title={`${flashcardSet?.numberVote} người đã đánh giá`}>
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
        ) : isLogin() ? (
          // <Tooltip title={"Sao chép thẻ"}>
          //   <IconButton onClick={cloneSet}>
          //     <SaveIcon />
          //   </IconButton>
          // </Tooltip>
          <CloneCardMenu handleTogleClone={handleTogleClone} />
        ) : (
          <></>
        )}
        {cloning ? <BackdropLoading /> : <></>}
        {alert.open ? (
          <SnapBarAlter
            alert={alert}
            handleCloseSnackBar={handleCloseSnackBar}
          />
        ) : (
          <></>
        )}
        {alertClone.open ? (
          <AlertCloneSet
            alertClone={alertClone}
            handleToggle={handleToggleAlert}
            onClone={handleClone}
            cloning={cloning}
          />
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default React.memo(ReadCardMeta);
