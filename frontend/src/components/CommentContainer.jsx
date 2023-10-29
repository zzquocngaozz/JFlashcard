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
const CommentContainer = ({ comments }) => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmitForm = function (data) {
    console.log(data);
  };

  console.log(comments);

  return (
    <Stack>
      <Stack sx={{ alignItems: "flex-start", padding: "20px 20px 0 20px" }}>
        {comments?.length === 1 ? (
          <Typography>Có {comments.length} bình luận</Typography>
        ) : comments?.length > 1 ? (
          <Button sx={{ textTransform: "none" }}>
            Có {comments.length} bình luận
          </Button>
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
          <Stack alignItems={"flex-start"} width={"90%"}>
            <TextField
              {...register("content", role["comment"])}
              id="comment-helper-text"
              type="text"
              placeholder="Mô tả"
              error={!!errors.content && !isDirty}
              helperText={errors.content?.message}
              fullWidth
              variant="outlined"
              sx={{ mb: "5px", "& input": { p: "10px 15px" } }}
            />

            <StackList>
              <Tooltip title={"Bình luận"}>
                <Box
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
          </Stack>
        </StackList>
      </form>
    </Stack>
  );
};

export default CommentContainer;
