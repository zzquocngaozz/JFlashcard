import {
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import learnImg from "../assets/images/learnCard.png";
import createImg from "../assets/images/createCard.png";
import teachImg from "../assets/images/teachCard.png";
import bannerSm from "../assets/images/banner-sm.png";
import userHonor from "../assets/images/userHonor.png";
import classHonor from "../assets/images/classHonor.png";
import Footer from "../components/Parts/Footer";
import Navbar from "../components/Parts/Navbar";
import { Link } from "react-router-dom";
import useGuestHome from "../hooks/useGuestHome";
import { StackList } from "../components/Styled/StyledStack";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import TopLearnSetCard from "../components/Cards/TopLearnSetCard";
import TopUser from "../components/TopUser";
import TopClass from "../components/TopClass";
const Home = () => {
  const revealRef = [useRef(null), useRef(null), useRef(null)];
  const { loading, data } = useGuestHome();

  useEffect(() => {
    document.title = "JFlashcards";
    window.scrollTo(0, 0);
    const onScroll = (e) => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      revealRef.forEach((reveal, index) => {
        let revealTop = reveal.current.getBoundingClientRect().top;
        if (windowHeight - revealTop > revealPoint) {
          // console.log(index, "reveal index");
          reveal.current.classList.add("reveal");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Stack
        sx={{
          width: "100%",
          height: "calc(100vh - 65px)",
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
            width: "400px",
            height: "400px",
          }}
        />
        <Stack
          // spacing={5}
          sx={{
            marginLeft: "5rem",
            maxWidth: "550px",
            rowGap: "20px",
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
          {data ? (
            <StackList justifyContent={"space-between"}>
              <StackList>
                <PeopleAltOutlinedIcon />
                <Typography>{data.numberUser} người dùng</Typography>
              </StackList>
              <StackList>
                <FilterNoneIcon />
                <Typography>{data.numberFLCard} bộ flashcard</Typography>
              </StackList>
              <StackList>
                <ClassOutlinedIcon />
                <Typography>{data.numberClass} lớp học</Typography>
              </StackList>
            </StackList>
          ) : (
            <StackList justifyContent={"space-between"}>
              <Skeleton width={"150px"} height={"30px"} />
              <Skeleton width={"150px"} height={"30px"} />
              <Skeleton width={"150px"} height={"30px"} />
            </StackList>
          )}
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            to={"/signup"}
            sx={{ width: "50%" }}
          >
            Đăng ký ngay
          </Button>
        </Stack>
      </Stack>
      <RevealFadeIn
        sx={{
          flexDirection: {
            md: "column",
            lg: "row",
          },
        }}
        ref={revealRef[0]}
      >
        <Stack
          sx={{
            maxWidth: 400,
            border: "1px solid #fff",
            flexDirection: "column-reverse",
            position: "relative",
            top: "150px",
            opacity: 0,
            transition: "all  500ms ease",
            transitionDelay: "150ms",
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
            <Button variant="contained" component={Link} to="/signin">
              Bắt đầu
            </Button>
          </Box>
        </Stack>

        <Stack
          spacing={5}
          sx={{
            justifyContent: "space-between",
            marginLeft: "5rem",
            maxWidth: "400px",
            spacing: "10px",
            position: "relative",
            top: "150px",
            opacity: 0,
            rowGap: "10px",
            transition: "all 500ms ease",
            transitionDelay: "300ms",
          }}
        >
          <Typography variant="h4" sx={{ marginTop: "8px" }}>
            Top 3 bộ thẻ điểm cao nhất
          </Typography>
          {data ? (
            <TopLearnSetCard
              setVote={data?.setVote}
              orientation={"horizontal"}
            />
          ) : (
            <></>
          )}
        </Stack>
      </RevealFadeIn>
      <RevealFadeIn
        className="reveal"
        sx={{
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
            alignItems: "center",
            position: "relative",
            top: "150px",
            opacity: 0,
            transition: "all  500ms ease",
            transitionDelay: "150ms",
          }}
        >
          <img
            src={userHonor}
            alt="create"
            style={{
              width: "80%",
              clipPath: "1/1",
              objectFit: "cover",
            }}
          />
          <Box width={"100%"}>
            <Typography variant="h4" mt={1}>
              Người học chăm chỉ
            </Typography>
            {data ? <TopUser userTop={data.userTop} /> : <Skeleton />}
          </Box>
        </Stack>

        <Stack
          spacing={5}
          sx={{
            marginLeft: "5rem",
            maxWidth: "400px",
            alignItems: "center",
            position: "relative",
            top: "150px",
            opacity: 0,
            transition: "all 500ms ease",
            transitionDelay: "300ms",
            "& a": {
              display: "block",
              maxWidth: "200px",
            },
          }}
        >
          <img
            src={classHonor}
            alt="create"
            style={{ width: "50%", clipPath: "1/1", objectFit: "cover" }}
          />
          <Box width={"100%"}>
            <Typography variant="h4">Lớp học nổi bật</Typography>
            {data ? <TopClass classRoom={data?.classRoom} /> : <></>}
          </Box>
        </Stack>
      </RevealFadeIn>
      <RevealFadeIn
        sx={{
          flexDirection: {
            md: "column",
            lg: "row",
          },
        }}
        ref={revealRef[1]}
      >
        <Stack
          sx={{
            maxWidth: 400,
            border: "1px solid #fff",
            flexDirection: "column",
            position: "relative",
            top: "150px",
            opacity: 0,
            transition: "all  500ms ease",
            transitionDelay: "150ms",
          }}
        >
          <Typography variant="h4" sx={{ marginTop: "8px" }}>
            Top 3 bộ thẻ được học nhiều nhất
          </Typography>
          {data ? <TopLearnSetCard setVote={data?.setVote} /> : <></>}
        </Stack>

        <Stack
          spacing={5}
          sx={{
            marginLeft: "5rem",
            maxWidth: "400px",
            spacing: "10px",
            position: "relative",
            top: "150px",
            opacity: 0,
            transition: "all 500ms ease",
            transitionDelay: "300ms",
            "& a": {
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
      </RevealFadeIn>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexDirection: {
            sm: "column",
            md: "row-reverse",
          },
          "& img": {
            position: "relative",
            right: "-150px",
            opacity: 0,
            transition: "all 0.5s ease-in",
            transitionDelay: "0.6s",
          },
          "&.reveal img": {
            right: "0",
            opacity: 1,
          },
        }}
        ref={revealRef[2]}
      >
        <img
          src={teachImg}
          alt="teach"
          style={{
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        />
        <Stack
          spacing={1}
          sx={{
            padding: "5rem",
            maxWidth: "500px",
            spacing: "10px",
            position: "relative",
            "& *": {
              position: "relative",
              left: "-150px",
              opacity: 0,
            },
            "& a": {
              maxWidth: "50%",
              transition: "all 0.5s ease-in",
              transitionDelay: "0.6s",
            },
            "& p:nth-of-type(1)": {
              transition: "all 0.5s ease-in",
              transitionDelay: "0.3s",
            },
            "& p:nth-of-type(2)": {
              transition: "all 0.5s ease-in",
              transitionDelay: "0.45s",
            },
            ".reveal & *": {
              left: "0",
              opacity: 1,
            },
          }}
        >
          <Typography variant="h4" component={"p"}>
            Truyền cảm hứng cho học sinh của bạn
          </Typography>
          <Typography variant="p" component={"p"}>
            Tạo lớp học và chia sẻ những bộ thẻ mà bạn có cho học sinh của mình.
            Đăng thông báo trong tường của lớp học và theo dõi tiến độ học tập
            của học sinh
          </Typography>
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            to={"/signup"}
          >
            Đăng ký ngay
          </Button>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

const RevealFadeIn = styled(Stack)({
  width: "100%",
  height: "100vh",
  justifyContent: "center",
  alignItems: "flex-start",
  position: "relative",
  "&.reveal>div": {
    top: "0px",
    opacity: 1,
  },
});

export default Home;
