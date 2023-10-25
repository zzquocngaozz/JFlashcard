import React from "react";
import { StackCardLink, StackList } from "../Styled/StyledStack";
import { Skeleton, Stack } from "@mui/material";

const SetSkeleton = () => {
  return (
    <StackCardLink to={"#"}>
      <StackList>
        <Skeleton height={"60px"} width={"80%"} />
        <Skeleton height={"60px"} width={"20%"} />
      </StackList>
      <Skeleton height={"40px"} width={"50%"} />
      <Skeleton height={"40px"} width={"50%"} />
      <Skeleton height={"40px"} width={"50%"} />
      <StackList mt={"25px"}>
        <Skeleton height={"50px"} width={"50px"} variant="circular" />
        <Skeleton height={"50px"} width={"80px"} />
        <Skeleton height={"50px"} width={"70px"} />
      </StackList>
    </StackCardLink>
  );
};

export default SetSkeleton;
