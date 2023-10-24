import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import learnImg from "../assets/images/learnCard.png";
import createImg from "../assets/images/createCard.png";
import teachImg from "../assets/images/teachCard.png";
import bannerSm from "../assets/images/banner-sm.png";
import Footer from "../components/Parts/Footer";
import Navbar from "../components/Parts/Navbar";

const Home = () => {
  useEffect(() => {
    document.title = "JFlashcards";
  }, []);
  return (
    <>
      <Navbar />
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: {
            sm: "column",
            md: "row",
          },
          padding: "10px",
        }}
      >
        <img
          src={bannerSm}
          alt="banner"
          style={{
            maxWidth: "500px",
            clipPath: "1/1",
          }}
        />
        <Stack
          spacing={5}
          sx={{
            marginLeft: "5rem",
            maxWidth: "500px",
            spacing: "10px",
            "& button": {
              display: "block",
              maxWidth: "200px",
            },
          }}
        >
          <Typography variant="h4">
            Học tiếng nhật cùng JFlashcards. Công cụ tối ưu cho việc học của bạn
          </Typography>
          <Typography variant="p">
            Hãy tham gia và tạo thẻ học phù hợp với mục đích học tập của bạn.
            Hán tự, Từ vựng, ngữ pháp và học để ghi nhớ bài học tập một cách
            hiệu quả với bộ thẻ của JFlashcards
          </Typography>
          <Button variant="contained" color="primary">
            Đăng ký ngay
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: {
            md: "column",
            lg: "row",
          },
        }}
      >
        <Stack
          sx={{
            maxWidth: 400,
            border: "1px solid #fff",
            flexDirection: "column-reverse",
          }}
        >
          <img
            src={createImg}
            alt="create"
            style={{ width: "100%", clipPath: "1/1", objectFit: "cover" }}
          />
          <Box>
            <Typography variant="h4" mt={1}>
              Ghi nhớ và ôn tập hiệu quả hơn
            </Typography>
            <Typography m="5px 0">
              Việc học bằng thẻ giúp bạn ghi nhớ từ tựng. Tối ưu hoá thẻ của bạn
              với bộ thẻ Từ vựng, Hán tự, ngữ pháp của JFlashcard
            </Typography>
            <Button variant="contained">Bắt đầu</Button>
          </Box>
        </Stack>

        <Stack
          spacing={5}
          sx={{
            marginLeft: "5rem",

            maxWidth: "400px",
            spacing: "10px",
            "& button": {
              display: "block",
              maxWidth: "200px",
            },
          }}
        >
          <img
            src={learnImg}
            alt="create"
            style={{ width: "100%", clipPath: "1/1", objectFit: "cover" }}
          />
          <Box>
            <Typography variant="h4">
              Tìm và học những bộ thẻ trên JFlashcards
            </Typography>
            <Typography>
              Tạo hoặc tìm kiếm những bộ thẻ có trên JFlashcard để việc học và
              ôn tập kiến thức hiệu quả hơn
            </Typography>
            <Button variant="contained" color="primary">
              Đăng ký ngay
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: {
            sm: "column",
            md: "row-reverse",
          },
        }}
      >
        <img
          src={teachImg}
          alt="teach"
          style={{
            maxWidth: "500px",
            clipPath: "1/1",
          }}
        />
        <Stack
          spacing={1}
          sx={{
            padding: "5rem",
            maxWidth: "500px",
            spacing: "10px",
            "& button": {
              display: "block",
              maxWidth: "200px",
            },
          }}
        >
          <Typography variant="h4">
            Truyền cảm hứng cho học sinh của bạn
          </Typography>
          <Typography variant="p">
            Tạo lớp học và chia sẻ những bộ thẻ mà bạn có cho học sinh của mình.
            Đăng thông báo trong tường của lớp học và theo dõi tiến độ học tập
            của học sinh
          </Typography>
          <Button variant="contained" color="primary">
            Đăng ký ngay
          </Button>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
