import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { StackList } from "./Styled/StyledStack";
import { getColorFromEnum } from "../utils/colorGetter";

const TopUser = ({ userTop: data }) => {
  return (
    <Stack sx={{ width: "100%", rowGap: "20px", margin: "20px 0" }}>
      {data?.map((user, index) => (
        <StackList justifyContent={"space-between"} key={index}>
          <StackList>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                bgcolor: `${getColorFromEnum(user.userName[0])}`,
              }}
            >
              {user.userName.toUpperCase()[0]}
            </Avatar>
            <Typography className="text--cap">{user.userName + " "}</Typography>
          </StackList>
          <Typography variant="h6">
            {"Đã học " + user.numberSet + " bộ"}
          </Typography>
        </StackList>
      ))}
    </Stack>
  );
};

export default TopUser;
