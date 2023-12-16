import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import ClassNav from "../components/Parts/ClassNav";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { Stack, Typography } from "@mui/material";
import ClassMemberCard from "../components/Cards/ClassMemberCard";
import useAuth from "../hooks/useAuth";
import useClassMember from "../hooks/useClassMember";

const ClassMember = () => {
  const { classRoomId } = useParams();
  const { currentUser } = useAuth();
  // const [loading, setLoading] = useState(false);
  const {
    classMember: members,
    loading,
    mutationing,
    deleteClassMember,
  } = useClassMember();
  useEffect(() => {
    document.title = "Xem thành viên";
  }, []);
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
                    classAdminId={members[0]?.userId}
                    isClassAdmin={member?.userId === members[0]?.userId}
                    onDelete={deleteClassMember}
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
