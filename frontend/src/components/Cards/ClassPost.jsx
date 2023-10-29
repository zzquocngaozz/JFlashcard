import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import { formatTime } from "../../utils/datetimeCalc";
import CommentContainer from "../CommentContainer";

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

const ClassPost = ({ postItem }) => {
  return (
    <Stack mt={3} className="container__theme" p={0}>
      <StackList p={2}>
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
      <Box p={3} pb={2} borderBottom={"1px solid rgba(0,0,0,0.5)"}>
        {postItem?.content}
      </Box>
      <CommentContainer comments={postItem?.comments} />
    </Stack>
  );
};

export default ClassPost;
