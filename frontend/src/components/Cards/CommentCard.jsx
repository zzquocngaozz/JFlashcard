import React from "react";
import { StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { formatTime } from "../../utils/datetimeCalc";
import DeleteIcon from "@mui/icons-material/Delete";
// const postComment = {
//   commentId: 1,
//   content: "First comment",
//   createAt: new Date().getTime(),
//   classPostId: 1,
//   author: { userId: 1, userName: "hieuht01", role: 1 },
// };

const CommentCard = ({ postComment, onDelete }) => {
  return (
    <StackList
      sx={{
        alignItems: "flex-start",
        mt: 1,
        width: "100%",
        "&:hover .delete-btn": { display: "flex" },
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          marginTop: "5px",
          bgcolor: `${getColorFromEnum(postComment.author?.userName[0])}`,
        }}
      >
        {postComment.author?.userName.toUpperCase()[0]}
      </Avatar>
      <Stack sx={{ width: "100%" }}>
        <StackList sx={{ width: "95%", justifyContent: "space-between" }}>
          <StackList>
            <Typography className="text--cap" sx={{ fontSize: "1.17rem" }}>
              {postComment.author?.userName}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#2D2424" }}>
              {formatTime(postComment.createdAt)}
            </Typography>
          </StackList>
          <Tooltip title={"Xoá bình luận"}>
            <IconButton
              className="delete-btn"
              sx={{ display: "none" }}
              size="small"
              color="error"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </StackList>
        <Typography>{postComment.content}</Typography>
      </Stack>
    </StackList>
  );
};

export default CommentCard;
