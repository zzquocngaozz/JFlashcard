import React, { useState } from "react";
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
import DialogAlertDelete from "../Dialog/DialogAlertDelete";
import useAuth from "../../hooks/useAuth";

const ClassMemberCard = ({
  member,
  classAdminId,
  isClassAdmin,
  onDelete,
  mutationing,
}) => {
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    message:
      "Thao tác này không thể hoàn lại. Bạn có muốn tiếp tục xoá thành viên trong lớp học",
  });
  const { currentUser } = useAuth();
  const handleToggleAlertDelete = () => {
    setAlertDelete({
      ...alertDelete,
      open: !alertDelete.open,
    });
  };

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
      {!isClassAdmin && currentUser.userId === classAdminId ? (
        <Tooltip title={`Xoá khỏi lớp học`}>
          <ActionHolderStack sx={{ top: "15px" }}>
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                handleToggleAlertDelete();
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </ActionHolderStack>
        </Tooltip>
      ) : (
        <></>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleAlertDelete}
          onDelete={() => {
            onDelete(member.userId, handleToggleAlertDelete);
          }}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
    </StackList>
  );
};

export default ClassMemberCard;
