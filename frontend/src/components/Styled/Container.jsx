import { Stack, styled } from "@mui/material";

export const StackContain = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-start",
  paddingTop: "20px",
  overflowX: "hidden", // Đặt overflowX thành "auto" hoặc "scroll"
  height: "300px", // Đặt chiều cao cố định (nếu cần)
  width: "100%",
  columnGap: "20px",
});

export const StackContainer = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  paddingTop: "20px",
  width: "100%",
  columnGap: "20px",
  rowGap: "30px",
});