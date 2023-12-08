import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { Stack } from "@mui/material";
import { useInitFlashcardSetContext } from "../context/FlashcardSetContext";
import GuestCardContainer from "../components/GuestCardContainer";
import ReadCardContainer from "../components/ReadCardContainer";
import ReadCardMeta from "../components/ReadCardMeta";
import useAuth from "../hooks/useAuth";
import CardPending from "../components/CardPending";

const ReadSet = () => {
  const { loading, isPublic } = useInitFlashcardSetContext();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Xem học phần";
  }, []);
  return (
    <LayoutNormal>
      <Stack p={3} pr={16} pl={16} minHeight={"100%"}>
        {loading ? (
          <BackdropLoading />
        ) : isPublic() ? (
          <>
            <ReadCardMeta />
            <Stack>
              {isLogin() ? <ReadCardContainer /> : <GuestCardContainer />}
            </Stack>
          </>
        ) : (
          <CardPending />
        )}
      </Stack>
    </LayoutNormal>
  );
};

export default ReadSet;
