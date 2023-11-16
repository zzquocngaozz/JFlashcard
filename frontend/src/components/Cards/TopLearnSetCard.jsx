import {
  Avatar,
  Chip,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { ROLE, SET_TYPE } from "../../utils/constant";
import { StackList } from "../Styled/StyledStack";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import StarIcon from "@mui/icons-material/Star";
import { getColorFromEnum } from "../../utils/colorGetter";
import { Link } from "react-router-dom";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
const setLearn = [
  {
    flashcardSetId: 2,
    title: "Từ vựng thông dụng",
    description: "",
    type: 2,
    createdAt: "2023-11-10",
    numberCard: 12,
    votePoint: 2,
    numberVote: 1,
    authDTO: {
      userId: 3,
      userName: "hieuht01",
      role: 2,
    },
    private: false,
  },
  {
    flashcardSetId: 4,
    title: "Kanji bộ thuỷ",
    description: "",
    type: 1,
    createdAt: "2023-11-12",
    numberCard: 36,
    votePoint: 0,
    numberVote: 0,
    authDTO: {
      userId: 2,
      userName: "hieuht02",
      role: 1,
    },
    private: false,
  },
  {
    flashcardSetId: 6,
    title: "Grammar",
    description: "",
    type: 1,
    createdAt: "2023-11-15",
    numberCard: 12,
    votePoint: 4,
    numberVote: 1,
    authDTO: {
      userId: 3,
      userName: "hieuht01",
      role: 2,
    },
    private: false,
  },
];

const TopLearnSetCard = ({ setVote: data }) => {
  return (
    <Stack sx={{ rowGap: "20px", marginTop: "0!important" }}>
      {data.map((set) => (
        <StackCardLink
          key={set.flashcardSetId}
          className="container__theme"
          to={`/${set?.flashcardSetId}/read`}
        >
          <StackList sx={{ justifyContent: "space-between" }}>
            <StackList justifyContent={"space-between"}>
              <FilterNoneIcon />
              <Typography className="text--overflow" sx={{ width: "150px" }}>
                {set.title}
              </Typography>
            </StackList>
            <Tooltip title={`${set?.numberVote} người đã đánh giá`}>
              <StackList>
                <StarIcon sx={{ color: "#ff9800" }} />
                <Typography>
                  {set?.votePoint + " "}({set?.numberVote})
                </Typography>
              </StackList>
            </Tooltip>
          </StackList>
          <StackList sx={{ justifyContent: "space-between" }}>
            <StackList>
              <NoteOutlinedIcon />
              <Typography>{set?.numberCard + " "} thẻ flashcard</Typography>
            </StackList>
            <Chip label={SET_TYPE[set?.type]} sx={{ width: "90px" }} />
          </StackList>
          <StackList>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: `${getColorFromEnum(set?.authDTO?.userName[0])}`,
              }}
            >
              {set?.authDTO?.userName.toUpperCase()[0]}
            </Avatar>
            <Typography>{set?.authDTO.userName + " "}</Typography>
            <Chip label={ROLE[set?.authDTO.role]} width={50} />
          </StackList>
        </StackCardLink>
      ))}
    </Stack>
  );
};

export default TopLearnSetCard;

const StackCardLink = styled(Link)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "15px 20px",
  rowGap: "10px",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.6), 0px 1px 1px 0px rgba(0,0,0,0.30), 0px 1px 3px 0px rgba(0,0,0,0.20)",
  },
});
