import { List, Stack, styled } from "@mui/material";

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

export const NavStyled = styled(List)({
  display: "flex",
  margin: "10px 0 10px 0",
  padding: "0px 15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  "& a": {
    padding: "10px",
  },
});
