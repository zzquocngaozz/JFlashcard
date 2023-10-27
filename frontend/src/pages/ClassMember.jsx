import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import ClassNav from "../components/Parts/ClassNav";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { Stack, Typography } from "@mui/material";
import ClassMemberCard from "../components/Cards/ClassMemberCard";
import useAuth from "../hooks/useAuth";

const members = [
  {
    userId: 4,
    userName: "ducpa04",
    role: 1,
  },
  {
    userId: 1,
    userName: "ducpa01",
    role: 1,
  },
  {
    userId: 2,
    userName: "ducpa02",
    role: 1,
  },
  {
    userId: 3,
    userName: "ducpa03",
    role: 1,
  },
];
const ClassMember = () => {
  const { classRoomId } = useParams();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log(members);

  return (
    <LayoutNormal>
      <Stack p={3} pr={5} pl={5}>
        {loading ? (
          <BackdropLoading />
        ) : (
          <>
            <ClassNav />
            <Stack flexDirection={"column"} pt={3} sx={{ columnGap: "30px" }}>
              <Typography variant="h2">Thành viên lớp học</Typography>
              <Stack spacing={2}>
                {members?.map((member) => (
                  <ClassMemberCard
                    key={member.userId}
                    member={member}
                    isClassAdmin={member.userId === currentUser.userId}
                  />
                ))}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </LayoutNormal>
  );
};

export default ClassMember;
