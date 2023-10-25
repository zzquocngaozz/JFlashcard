import React, { useEffect, useRef, useState } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { getColorFromEnum } from "../utils/colorGetter";
import { ROLE } from "../utils/constant";

const LibRoot = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // if (location.pathname === "/my-lib") navigate("/my-lib/sets");
  }, [navigate]);

  const linkRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [hoverOffset, setHoverOffset] = useState({ left: 0, width: 0 });

  const handleMouseOver = (e) => {
    const node = e.target.getBoundingClientRect();
    setHoverOffset({
      left: Math.floor(node.left),
      width: Math.floor(node.width),
    });
  };

  const handleMouseOut = () => {
    linkRefs.forEach((ref, index) => {
      const link = ref.current;
      if (link && link.classList.contains("active")) {
        const rect = link.getBoundingClientRect();
        setHoverOffset({
          left: Math.floor(rect.left),
          width: Math.floor(rect.width),
        });
      }
    });
  };

  useEffect(() => {
    linkRefs.forEach((ref, index) => {
      const link = ref.current;
      if (link && link.classList.contains("active")) {
        const rect = link.getBoundingClientRect();
        setHoverOffset({
          left: Math.floor(rect.left),
          width: Math.floor(rect.width),
        });
      }
    });
    if (location.pathname === "/my-lib") navigate("/my-lib/sets");
  }, [location.pathname]);
  return (
    <>
      <LayoutNormal>
        <Box sx={{ mt: 2, mr: 5, ml: 5, mb: 2 }}>
          <BannerLib>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: `${getColorFromEnum(currentUser?.userName[0])}`,
              }}
            >
              {currentUser?.userName.toUpperCase()[0]}
            </Avatar>
            <Stack>
              <Typography variant="h5" component={"div"} pl={2}>
                {currentUser.firstName + " "} {currentUser.lastName}
                <Chip
                  label={ROLE[currentUser.role]}
                  width={50}
                  sx={{ ml: 2 }}
                />
              </Typography>
              <Typography variant="h6" pl={2}>
                {currentUser.userName}
              </Typography>
            </Stack>
          </BannerLib>
          <NavStyled>
            <NavLink
              to={"/my-lib/recent"}
              ref={linkRefs[0]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <ListItem>Lịch sử học</ListItem>
            </NavLink>
            <NavLink
              to={"/my-lib/marked"}
              ref={linkRefs[1]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <ListItem>Đánh dấu</ListItem>
            </NavLink>
            <NavLink
              to={"/my-lib/sets"}
              ref={linkRefs[2]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <ListItem>Học phần</ListItem>
            </NavLink>
            <NavLink
              to={"/my-lib/folders"}
              ref={linkRefs[3]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <ListItem>Thư mục</ListItem>
            </NavLink>
            <NavLink
              to={"/my-lib/classes"}
              ref={linkRefs[4]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <ListItem>Lớp học</ListItem>
            </NavLink>
            <div
              style={{
                height: "3px",
                backgroundColor: "#007fe3",
                left: `${hoverOffset.left - 20}px`,
                width: `${hoverOffset.width - 35}px`,
                borderRadius: "8px",
                bottom: "10px",
                position: "absolute",
                transition: "all 120ms cubic-bezier(0.4, 0, 0.2, 1) 10ms",
              }}
            ></div>
          </NavStyled>
          <Outlet />
        </Box>
      </LayoutNormal>
    </>
  );
};

const BannerLib = styled(Stack)({
  padding: "15px 25px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  flexDirection: "row",
  alignItems: "center",
  columnGap: "10px",
});

const NavStyled = styled(List)({
  display: "flex",
  margin: "10px 0 10px 0",
  padding: "0px 15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  "& a": {
    padding: "10px",
  },
  //   "& a": {
  //     position: "relative",
  //     "&:after": {
  //       // Sử dụng "&" để liên kết với lớp active của thẻ a
  //       content: '""',
  //       position: "absolute",
  //       left: "10px",
  //       right: "10px",
  //       // width: '50px',
  //       height: "0px",
  //       backgroundColor: "#007fe3",
  //       transition: "all 120ms cubic-bezier(0.4, 0, 0.2, 1) 10ms",
  //     },
  //     "&:hover:after": {
  //       // Sử dụng "&" để liên kết với lớp active của thẻ a
  //       height: "3px",
  //       borderRadius: "3px",
  //     },
  //     "&.active:after": {
  //       // Sử dụng "&" để liên kết với lớp active của thẻ a
  //       height: "3px",
  //       backgroundColor: "#007fe3",
  //     },
  //   },
});
export default LibRoot;
