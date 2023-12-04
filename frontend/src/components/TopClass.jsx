import { Stack, Typography } from "@mui/material";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { StackList } from "./Styled/StyledStack";

const TopClass = ({ classRoom: data }) => {
  return (
    <Stack sx={{ rowGap: "20px" }}>
      {data ? (
        data.map((clazz, index) => (
          <Stack key={index} className="container__theme">
            <StackList>
              <SchoolIcon />
              <Typography
                variant="h5"
                sx={{ width: "320" }}
                className="text--overflow"
              >
                {clazz?.classRoomName}
              </Typography>
            </StackList>
            <StackList>
              <PeopleIcon />
              <Typography>{clazz?.numberMember + " "} thành viên</Typography>
            </StackList>
          </Stack>
        ))
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default TopClass;
