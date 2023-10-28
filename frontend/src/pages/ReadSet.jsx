import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ShowMoreText from "../components/DataDisplay/ShowMoreText";
import { ROLE, SET_TYPE } from "../utils/constant";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import StarIcon from "@mui/icons-material/Star";
import { StackList } from "../components/Styled/StyledStack";
import useAuth from "../hooks/useAuth";
import { getColorFromEnum } from "../utils/colorGetter";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SetVote from "../components/Menu/SetVote";
import FlashcardBookMark from "../components/DataDisplay/FlashcardBookMark";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import GuestCardContainer from "../components/GuestCardContainer";

const ReadSet = () => {
  const { flashcardSet, setFlashcardSet } = useFlashcardSetContext();
  const { isLogin, currentUser } = useAuth();
  const { setId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFlashcardSet({
        flashcardSetId: 7,
        title: "Từ vựng minna",
        description:
          "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        numberVote: 27,
        votePoint: 4.5,
        numberCard: 60,
        voted: 0,
        isBookMarked: true,
        createdAt: "2023/10/10",
        type: 2,
        private: false,
        authoDTO: {
          userId: 1,
          userName: "ducpa01",
          role: 1,
        },
        cards: [
          {
            cardId: 20,
            onSound: "ソク",
            kunSound: "あし",
            chineseSound: "Túc",
            term: "足",
            mean: "Đầy đủ, chân",
            example: "犬が彼女の足にかみついた",
            exampleMean: "Một con chó đã cắn vào chân cô ấy",
            imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
            trick: "Chân(足) không đủ(不足) dài để thi chạy",
            flashcardSetId: 1,
          },
          {
            cardId: 13,
            term: "冷えう",
            mean: "Đầy đủ, chân",
            example:
              "ウェルカムパーティーはさくら公において行(おこな)われる予定です",
            exampleMean:
              "Bữa tiệc chào mừng dự kiến sẽ được tổ chứcở công viên sakura",
            imgUrl:
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format",
            flashcardSetId: 1,
          },
          {
            cardId: 14,
            combination: "Ｖ-タ形 ／Ｎの＋上で",
            note: "N ở đây là danh động từ",
            term: "A~上(で)B",
            mean: "Sau khi làm A thì làm B",
            example:
              "電話または協会窓口でお申し込みの上、当日参加費をお支払いください",
            exampleMean:
              "Sau khi đăng ký bằng điện thoại hoặc quầy lễ tân, hãy thanh toán phí tham gia của ngày hôm đó",
            imgUrl:
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format",
            flashcardSetId: 8,
          },
          {
            cardId: 4,
            onSound: "がぞう",
            kunSound: "がぞう",
            chineseSound: "がぞう",
            term: "戻り値",
            mean: "Giá trị trả về",
            example: "参照アクセス",
            exampleMean: "khoá ngoại ",
            imgUrl: "https://www.sk-access.com/syo_table/na007_01.jpg",
            trick: "がぞう",
            flashcardSetId: 1,
          },
        ],
        learnedCards: [
          {
            trackingProgressId: 1,
            cardId: 4,
            userId: 7,
            flashcardSetId: 1,
            createdAt: 32154013,
            lastLearn: 12312311,
          },
        ],
        markedCards: [
          {
            bookMarkCardId: 1,
            userId: 4,
            flashcardSetId: 1,
            cardId: 1,
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [setId]);
  console.log("?");
  return (
    <LayoutNormal>
      <Stack p={3} pr={16} pl={16}>
        {loading ? (
          <BackdropLoading />
        ) : (
          <>
            <Stack
              // pr={4}
              // pl={4}
              sx={{
                columnGap: "30px",
                rowGap: "20px",
                borderBottom: "1px solid rgba(0,0,0,0.25)",
              }}
              // className="container__theme"
            >
              <Stack sx={{ columnGap: "30px", flexDirection: "row" }}>
                <Stack flex={3} sx={{ gap: 2 }}>
                  <Typography variant="h5">{flashcardSet?.title}</Typography>
                  <ShowMoreText maxLength={100}>
                    {flashcardSet?.description}
                  </ShowMoreText>
                  <Stack sx={{ flexDirection: "row", gap: 1, width: 200 }}>
                    <Chip
                      label={SET_TYPE[flashcardSet?.type]}
                      color="info"
                      variant="contained"
                      sx={{ mr: 1 }}
                    />
                    {flashcardSet?.private ? (
                      <Chip
                        label={"Riêng tư"}
                        color="default"
                        variant="contained"
                      />
                    ) : (
                      <Chip
                        label={"Công khai"}
                        color="secondary"
                        variant="contained"
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack>
                  {!isLogin() ? (
                    <Tooltip
                      title={`${flashcardSet.numberVote} người đã đánh giá`}
                    >
                      <StackList>
                        <StarIcon sx={{ color: "#ff9800" }} />
                        <Typography>
                          {flashcardSet?.votePoint + " "}(
                          {flashcardSet?.numberVote})
                        </Typography>
                      </StackList>
                    </Tooltip>
                  ) : (
                    <StackList>
                      <SetVote />
                      <FlashcardBookMark />
                    </StackList>
                  )}
                </Stack>
              </Stack>
              <Button
                sx={{ textTransform: "none", borderRadius: "20px" }}
                variant="contained"
                onClick={() => {
                  navigate(`/${setId + 1}/read`);
                }}
              >
                Học bộ này
              </Button>
              <Stack pb={3} flexDirection={"row"}>
                <StackList flex={3}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: `${getColorFromEnum(
                        flashcardSet?.authoDTO?.userName[0]
                      )}`,
                    }}
                  >
                    {flashcardSet.authoDTO?.userName.toUpperCase()[0]}
                  </Avatar>
                  <Typography>
                    {flashcardSet.authoDTO.userName + " "}
                  </Typography>
                  <Chip label={ROLE[flashcardSet.authoDTO.role]} width={50} />
                </StackList>
                {isLogin() &&
                currentUser.userId === flashcardSet.authoDTO.userId ? (
                  <Tooltip title={"Chỉnh sửa"}>
                    <IconButton
                      LinkComponent={Link}
                      to={`/${flashcardSet.flashcardSetId}/edit`}
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </Tooltip>
                ) : isLogin() ? (
                  <Tooltip title={"Lưu và sửa"}>
                    <IconButton
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
            <Stack>
              <GuestCardContainer />
            </Stack>
          </>
        )}
      </Stack>
    </LayoutNormal>
  );
};

export default ReadSet;
