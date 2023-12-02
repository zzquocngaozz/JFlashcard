import { Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StackList = styled(Stack)({
  flexDirection: "row",
  columnGap: "15px",
  alignItems: "center",
});

export const StarHolderStack = styled(Stack)({
  position: "absolute",
  top: "22px",
  right: "20px",
  flexDirection: "row",
  columnGap: "5px",
  alignItems: "center",
});

export const ActionHolderStack = styled(Stack)({
  position: "absolute",
  bottom: "15px",
  right: "25px",
  flexDirection: "row",
  columnGap: "5px",
  alignItems: "center",
});

export const StackCardLink = styled(Link)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "30%",
  minWidth: "300px",
  height: "250px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "15px 20px",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.6), 0px 1px 1px 0px rgba(0,0,0,0.30), 0px 1px 3px 0px rgba(0,0,0,0.20)",
  },
});
