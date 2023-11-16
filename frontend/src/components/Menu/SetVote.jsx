import { Menu, Rating, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import useAuth from "../../hooks/useAuth";
import { StackList } from "../Styled/StyledStack";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";

const SetVote = () => {
  const { vote, updateVote: onChange, mutation } = useFlashcardSetContext();
  const [inital, setInital] = useState(true);
  // const [vote, setVote] = React.useState({});
  const [cacheVote, setCacheVote] = React.useState({});
  const { currentUser } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVoteChange = (event, newValue) => {
    const isVoted = vote.voted !== 0;

    const changeBound = newValue - vote.voted;
    const newNumberVoted = isVoted ? vote.numberVote : vote.numberVote + 1;
    const newVotePoint =
      (vote.votePoint * vote.numberVote + changeBound) / newNumberVoted;
    onChange({
      voted: newValue,
      numberVote: newNumberVoted,
      votePoint: Number(newVotePoint.toFixed(2)),
    });

    handleClose();
  };

  return (
    <>
      <Tooltip title={`${vote?.numberVote} người đã đánh giá`}>
        <StackList
          sx={{
            cursor: "pointer",
            pointerEvents: `${mutation ? "none" : "auto"}`,
          }}
          onClick={handleClick}
        >
          <StarIcon sx={{ color: "#ff9800" }} />
          <Typography>
            {vote?.votePoint + " "}({vote?.numberVote})
          </Typography>
        </StackList>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="add-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{ "& .MuiMenu-paper": { p: "1px 15px" } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography>Đánh giá</Typography>
        <Rating
          name="simple-controlled"
          value={vote.voted}
          onChange={(event, newValue) => {
            handleVoteChange(event, newValue);
          }}
        />
      </Menu>
    </>
  );
};

export default React.memo(SetVote);
