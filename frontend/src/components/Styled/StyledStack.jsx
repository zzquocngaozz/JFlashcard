import { Stack, styled } from "@mui/material";



export const StackList = styled(Stack)({
  flexDirection: "row",
  columnGap: "15px",
  alignItems: "center",
});

export const StarHolderStack = styled(Stack)({
  position: "absolute",
  top: "15px",
  right: "25px",
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