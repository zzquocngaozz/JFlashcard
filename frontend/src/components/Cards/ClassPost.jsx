import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import { formatTime } from "../../utils/datetimeCalc";
import CommentContainer from "../CommentContainer";
import ClassPostAction from "../Menu/ClassPostAction";
import DialogAlertDeletePost from "../Dialog/DialogAlertDeletePost";
import ClassPostForm from "../Dialog/ClassPostForm";
import { useClassPostContext } from "../../context/ClassPostContext";
import useAuth from "../../hooks/useAuth";
import { useClassContext } from "../../context/ClassContext";
import DeleteIcon from "@mui/icons-material/Delete";
// const postItem = {
//   classPostId: 1,
//   content: "This is the first blog post",
//   createAt: new Date("2023-10-30 16:00:00").getTime(),
//   creator: { userId: 1, userName: "hieuht01", role: 1 },
//   comnents: [
//     {
//       commentId: 1,
//       content: "First comment",
//       createAt: new Date().getTime(),
//       classPostId: 1,
//       creator: { userId: 1, userName: "hieuht01", role: 1 },
//     },
//   ],
// };

const ClassPost = ({ postItem }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { currentUser } = useAuth();
  const { isClassAdmin } = useClassContext();
  const { updateClassPost, deleteClassPost, mutation } = useClassPostContext();
  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const handleToggleDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  const handleUpdate = (data) => {
    // onUpdate(data, handleToggleForm);
    updateClassPost(data, handleToggleForm);
  };

  return (
    <Stack mt={3} className="container__theme" p={0}>
      <StackList p={2} justifyContent={"space-between"}>
        <StackList>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: `${getColorFromEnum(postItem.creator?.userName[0])}`,
            }}
          >
            {postItem.creator?.userName.toUpperCase()[0]}
          </Avatar>
          <Stack>
            <Typography className="text--cap">
              {postItem.creator?.userName}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#2D2424" }}>
              {formatTime(postItem.createdAt)}
            </Typography>
          </Stack>
        </StackList>
        {postItem?.creator?.userId === currentUser?.userId ? (
          <ClassPostAction
            handleToggleUpdate={handleToggleForm}
            handleToggleDelete={handleToggleDelete}
          />
        ) : isClassAdmin() ? (
          <Tooltip title={"Gỡ bài"}>
            <IconButton onClick={handleToggleDelete} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
      </StackList>
      <Box
        p={3}
        pb={2}
        sx={{ maxWidth: "930px", wordBreak: "break-all" }}
        borderBottom={"1px solid rgba(0,0,0,0.5)"}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: postItem?.content?.replace(/\n/g, "<br />"),
          }}
        />
      </Box>
      <CommentContainer
        comments={postItem?.comments}
        classPostId={postItem?.classPostId}
      />
      {openForm ? (
        <ClassPostForm
          handleToggle={handleToggleForm}
          dataInit={postItem}
          onSubmit={handleUpdate}
          mutationing={mutation}
        />
      ) : (
        <></>
      )}
      {openDelete ? (
        <DialogAlertDeletePost
          handleToggle={handleToggleDelete}
          onDelete={() => {
            deleteClassPost(postItem?.classPostId, handleToggleDelete);
          }}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ClassPost;
