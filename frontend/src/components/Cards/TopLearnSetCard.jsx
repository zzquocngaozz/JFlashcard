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
import useAuth from "../../hooks/useAuth";

const TopLearnSetCard = ({ setVote: data, orientation }) => {
  const { isLogin } = useAuth();
  return (
    <Stack
      sx={{
        rowGap: "20px",
        columnGap: "10px",
        marginTop: "0!important",
        flexDirection: `${orientation === "vertical" ? "row" : "column"}`,
      }}
    >
      {data?.map((set) => (
        <StackCardLink
          key={set.flashcardSetId}
          className="container__theme"
          to={isLogin() ? `` : `/${set?.flashcardSetId}/read`}
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
