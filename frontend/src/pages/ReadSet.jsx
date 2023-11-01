import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { Stack } from "@mui/material";
import { useInitFlashcardSetContext } from "../context/FlashcardSetContext";
import GuestCardContainer from "../components/GuestCardContainer";
import ReadCardContainer from "../components/ReadCardContainer";
import ReadCardMeta from "../components/ReadCardMeta";
import useAuth from "../hooks/useAuth";

const ReadSet = () => {
  const { loading } = useInitFlashcardSetContext();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();
  // const [loading, setLoading] = useState(true);

  return (
    <LayoutNormal>
      <Stack p={3} pr={16} pl={16}>
        {loading ? (
          <BackdropLoading />
        ) : (
          <>
            <ReadCardMeta />
            <Stack>
              {isLogin() ? <ReadCardContainer /> : <GuestCardContainer />}
            </Stack>
          </>
        )}
      </Stack>
    </LayoutNormal>
  );
};

export default ReadSet;
