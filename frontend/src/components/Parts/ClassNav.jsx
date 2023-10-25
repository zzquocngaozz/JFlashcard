import React, { useEffect, useRef, useState } from "react";
import { NavStyled } from "../Styled/Container";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { ListItem } from "@mui/material";

export default function ClassNav() {
  const location = useLocation();
  const { classRoomId } = useParams();
  const linkRefs = [useRef(null), useRef(null), useRef(null)];
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
  }, [location.pathname]);

  return (
    <NavStyled sx={{ boxShadow: "1px 2px 5px -1px rgba(0,0,0,0.25)" }}>
      <NavLink
        to={`/class/${classRoomId}`}
        ref={linkRefs[0]}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ListItem>Bảng tin</ListItem>
      </NavLink>
      <NavLink
        to={`/class/${classRoomId}/class-sets`}
        ref={linkRefs[1]}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ListItem>Bộ Flashcard</ListItem>
      </NavLink>
      <NavLink
        to={`/class/${classRoomId}/class-members`}
        ref={linkRefs[2]}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ListItem>Thành viên</ListItem>
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
  );
}
