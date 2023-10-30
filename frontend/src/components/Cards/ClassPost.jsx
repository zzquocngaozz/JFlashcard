import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import { formatTime } from "../../utils/datetimeCalc";
import CommentContainer from "../CommentContainer";
import ClassPostAction from "../Menu/ClassPostAction";
import DialogAlertDeletePost from "../Dialog/DialogAlertDeletePost";
import ClassPostForm from "../Dialog/ClassPostForm";

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
//       author: { userId: 1, userName: "hieuht01", role: 1 },
//     },
//   ],
// };

const ClassPost = ({ postItem, onUpdate, onDelete, mutationing }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const handleToggleDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  const handleUpdate = (data) => {
    // onUpdate(data, handleToggleForm);
    console.log(data);
    handleToggleForm();
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
        <ClassPostAction
          handleToggleUpdate={() => {
            handleToggleForm();
          }}
          handleToggleDelete={handleToggleDelete}
        />
      </StackList>
      <Box p={3} pb={2} borderBottom={"1px solid rgba(0,0,0,0.5)"}>
        {postItem?.content}
      </Box>
      <CommentContainer comments={postItem?.comments} />
      {openForm ? (
        <ClassPostForm
          handleToggle={handleToggleForm}
          dataInit={postItem}
          onSubmit={handleUpdate}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openDelete ? (
        <DialogAlertDeletePost
          handleToggle={handleToggleDelete}
          onDelete={() => {
            onDelete(postItem?.classPostId, handleToggleDelete);
          }}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ClassPost;
