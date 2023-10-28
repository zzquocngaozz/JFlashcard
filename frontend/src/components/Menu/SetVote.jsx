import { Menu, Rating, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import useAuth from "../../hooks/useAuth";
import { StackList } from "../Styled/StyledStack";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";

const SetVote = () => {
  const { vote: data } = useFlashcardSetContext();
  const [vote, setVote] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isVoted, setIsVoted] = React.useState(vote?.voted !== 0);
  const [votedPoint, setVotedPoint] = React.useState(vote?.voted);
  const { currentUser } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVoteChange = (event, newValue) => {
    console.log(newValue);
    console.log(isVoted);
    setVotedPoint(newValue);
    console.log(votedPoint);
    setIsVoted(true);
    const changeBound = newValue - vote.voted;
    const newNumberVoted = isVoted ? vote.numberVote : vote.numberVote + 1;
    const newVotePoint =
      (vote.votePoint * vote.numberVote + changeBound) / newNumberVoted;
    setVote({
      voted: newValue,
      numberVote: newNumberVoted,
      votePoint: Number(newVotePoint.toFixed(2)),
    });
    handleClose();
  };

  useEffect(() => {
    setVote(data);
    console.log(votedPoint);
  }, [data]);

  return (
    <>
      <Tooltip title={`${vote?.numberVote} người đã đánh giá`}>
        <StackList sx={{ cursor: "pointer" }} onClick={handleClick}>
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
          value={votedPoint}
          onChange={(event, newValue) => {
            handleVoteChange(event, newValue);
          }}
        />
      </Menu>
    </>
  );
};

export default SetVote;
