import React from "react";
import { ActionHolderStack, StackList } from "../Styled/StyledStack";
import { getColorFromEnum } from "../../utils/colorGetter";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ClassMemberCard = ({ member, isClassAdmin, handleToggleDelete }) => {
  return (
    <StackList className="container__theme" sx={{ position: "relative" }}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: `${getColorFromEnum(member?.userName[0])}`,
        }}
      >
        {member?.userName.toUpperCase()[0]}
      </Avatar>
      <Typography>{member?.userName + " "}</Typography>
      <Chip label={isClassAdmin ? "Giáo viên" : "Thành viên"} width={50} />
      {!isClassAdmin ? (
        <Tooltip title={`Xoá khỏi lớp học`}>
          <ActionHolderStack sx={{ top: "15px" }}>
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                handleToggleDelete(member?.userId);
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </ActionHolderStack>
        </Tooltip>
      ) : (
        <></>
      )}
    </StackList>
  );
};

export default ClassMemberCard;
