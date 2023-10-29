import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import searhbanner from "../assets/images/searhbanner.png";
import { StackList } from "./Styled/StyledStack";
import useAuth from "../hooks/useAuth";
import { getColorFromEnum } from "../utils/colorGetter";
import ClassPost from "./Cards/ClassPost";

const PostContainer = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const postList = [
    {
      classPostId: 1,
      content: "This is the first blog post",
      createdAt: new Date("2023-10-29 16:00:00").getTime(),
      classRoomId: 1,
      creator: { userId: 1, userName: "hieuht01", role: 1 },
      comments: [
        {
          commentId: 1,
          content: "First comment",
          createAt: new Date("2023-10-29 16:03:00").getTime(),
          classPostId: 1,
          author: { userId: 1, userName: "hieuht01", role: 1 },
        },
      ],
    },
  ];

  console.log("checkcheck");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack>
      {loading ? (
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "70px",
              borderRadius: "20px",
              margin: "10px 10px 10px 0",
            }}
          />
        </Box>
      ) : (
        <StackList className="container__theme">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: `${getColorFromEnum(currentUser?.userName[0])}`,
            }}
          >
            {currentUser?.userName.toUpperCase()[0]}
          </Avatar>
          <Box
            flex={2}
            sx={{
              height: "100%",
              padding: "10px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              ":hover": {
                borderColor: "#0C356A",
              },
            }}
          >
            <Typography>Đăng bài vào lớp của bạn</Typography>
          </Box>
        </StackList>
      )}
      {loading ? (
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "100px",
              borderRadius: "20px",
              margin: "10px 0",
              marginTop: "30px",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              height: "100px",
              borderRadius: "20px",
              margin: "10px 0",
              marginTop: "30px",
            }}
          />
        </Box>
      ) : postList.length === 0 ? (
        <Stack minHeight={250} justifyContent={"center"} alignItems={"center"}>
          <Box width={70} height={70}>
            <img src={searhbanner} loading="lazy" alt="notfound" />
          </Box>
          <Typography textAlign={"center"}>
            Hãy đăng thông báo đầu tiên cho lớp học của bạn
          </Typography>
        </Stack>
      ) : (
        postList.map((postItem, index) => (
          <ClassPost key={index} postItem={postItem} />
        ))
      )}
      {/* {openForm ? (
        <VocaDialogForm
          handleToggle={handleToggleForm}
          onSubmit={addCard}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )} */}
    </Stack>
  );
};

export default PostContainer;
