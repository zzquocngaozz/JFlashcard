import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { role } from "../utils/regexRole";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import useAuth from "../hooks/useAuth";
import { getColorFromEnum } from "../utils/colorGetter";
import { StackList } from "./Styled/StyledStack";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import CommentCard from "./Cards/CommentCard";
import { useClassContext } from "../context/ClassContext";
import { useClassPostContext } from "../context/ClassPostContext";
const CommentContainer = ({ comments, classPostId }) => {
  const { createComment } = useClassPostContext();
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmitForm = function (data) {
    createComment(data, classPostId, reset);
  };

  return (
    <Stack>
      <Stack sx={{ alignItems: "flex-start", padding: "20px 20px 0 20px" }}>
        {comments?.length === 1 ? (
          <>
            <Typography>Có {comments.length} bình luận</Typography>
            <CommentCard postComment={comments[0]} />
          </>
        ) : comments?.length > 1 ? (
          <>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              Có {comments.length} bình luận
            </Button>
            {open ? (
              <>
                {comments?.map((comment) => (
                  <CommentCard postComment={comment} />
                ))}
              </>
            ) : (
              <CommentCard postComment={comments[0]} />
            )}
          </>
        ) : (
          <></>
        )}
      </Stack>
      <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <StackList
          sx={{ alignItems: "flex-start", padding: "20px 20px 0 20px" }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: `${getColorFromEnum(currentUser?.userName[0])}`,
            }}
          >
            {currentUser?.userName.toUpperCase()[0]}
          </Avatar>

          <TextField
            {...register("content", role["comment"])}
            id="comment-helper-text"
            type="text"
            placeholder="Mô tả"
            error={!!errors.content && !isDirty}
            helperText={errors.content?.message}
            fullWidth
            variant="outlined"
            sx={{
              mb: "15px",
              "& input": { p: "10px 15px" },
            }}
          />

          <Tooltip title={"Bình luận"}>
            <Box
              className="send-btn"
              sx={{
                width: 50,
                height: 50,
              }}
            >
              <IconButton disabled={!isDirty} type="submit">
                <SendRoundedIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </StackList>
      </form>
    </Stack>
  );
};

export default React.memo(CommentContainer);
