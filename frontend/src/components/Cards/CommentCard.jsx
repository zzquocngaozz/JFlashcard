import React from "react";
import { StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatTime } from "../../utils/datetimeCalc";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { useClassPostContext } from "../../context/ClassPostContext";
import { useClassContext } from "../../context/ClassContext";

const CommentCard = ({ postComment }) => {
  const { currentUser } = useAuth();
  const { isClassAdmin } = useClassContext();
  const { mutation, deleteComment } = useClassPostContext();
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
          bgcolor: `${getColorFromEnum(postComment?.creator?.userName[0])}`,
        }}
      >
        {postComment?.creator?.userName.toUpperCase()[0]}
      </Avatar>
      <Stack sx={{ width: "100%" }}>
        <StackList
          sx={{
            width: "100%",
            height: "1.17rem",
            justifyContent: "space-between",
          }}
        >
          <StackList>
            <Typography className="text--cap">
              {postComment?.creator?.userName}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#2D2424" }}>
              {formatTime(postComment?.createdAt)}
            </Typography>
          </StackList>
          {/* Add condition here*/}
          {postComment?.creator?.userId === currentUser.userId ||
          isClassAdmin() ? (
            <Tooltip title={"Xoá bình luận"}>
              <Box>
                <IconButton
                  className="delete-btn"
                  sx={{ display: "none" }}
                  size="small"
                  color="error"
                  disabled={mutation}
                  onClick={() => {
                    deleteComment(
                      postComment?.commentId,
                      postComment?.classPostId
                    );
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Tooltip>
          ) : (
            <></>
          )}
        </StackList>
        <Typography>{postComment?.content}</Typography>
      </Stack>
    </StackList>
  );
};

export default CommentCard;
