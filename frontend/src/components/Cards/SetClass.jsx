import { Avatar, Chip, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { getColorFromEnum } from "../../utils/colorGetter";
import { FLAG_STATUS, ROLE, SET_TYPE } from "../../utils/constant";
import { parseBirth } from "../../utils/datetimeCalc";
import {
  StackCardLink,
  StackList,
  StarHolderStack,
} from "../Styled/StyledStack";
import ClassSetAction from "../Menu/ClassSetAction";
import DialogAlertDelete from "../Dialog/DialogAlertDelete";
import FormClassSetDialog from "../Dialog/FormClassSetDialog";
import { useClassContext } from "../../context/ClassContext";

const SetClass = ({ flashcardSet: data, onDelete, onUpdate, mutationing }) => {
  const [flashcardSet, setFlashcardSet] = useState({});
  const { isClassAdmin } = useClassContext();
  useEffect(() => {
    setFlashcardSet(data);
  }, [data]);
  const [alertDelete, setAlertDelete] = useState({
    open: false,
    message:
      "Thao tác không thể hoàn lại. Bạn có chắc muốn xoá bộ flashcard khỏi lớp  học!",
  });

  const [openEditForm, setOpenEditFrom] = useState(false);
  const handleToggleDelete = (e) => {
    e?.preventDefault();
    setAlertDelete({
      ...alertDelete,
      open: !alertDelete.open,
    });
  };
  const handleToggleUpdate = (e) => {
    e?.preventDefault();
    setOpenEditFrom((prev) => !prev);
  };

  return (
    <StackCardLink to={`/${flashcardSet?.flashcardSetId}/read`}>
      <Stack spacing={1}>
        <StackList>
          <FilterNoneIcon />
          <Typography
            className="text--overflow2line"
            variant="h5"
            sx={{
              width: "65%",
            }}
          >
            {flashcardSet?.title}
          </Typography>
        </StackList>
        <StackList>
          <Chip label={SET_TYPE[flashcardSet?.type]} sx={{ width: "90px" }} />
          <Chip
            label={FLAG_STATUS[flashcardSet?.status]}
            sx={{ width: "90px" }}
          />
        </StackList>
        <StackList>
          <NoteOutlinedIcon />
          <Typography>
            {flashcardSet?.numberCard + " "} thẻ flashcard
          </Typography>
        </StackList>
        <StackList>
          <AccessTimeIcon sx={{ color: "#079" }} />
          <Typography>{parseBirth(flashcardSet?.startAt)}</Typography>
          <Typography>{parseBirth(flashcardSet?.dueAt)}</Typography>
        </StackList>
      </Stack>
      <StackList>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: `${getColorFromEnum(flashcardSet?.authDTO?.userName[0])}`,
          }}
        >
          {flashcardSet?.authDTO?.userName.toUpperCase()[0]}
        </Avatar>
        <Typography>{flashcardSet?.authDTO?.userName + " "}</Typography>
        <Chip label={ROLE[flashcardSet?.authDTO?.role]} width={50} />
      </StackList>
      {isClassAdmin() ? (
        <StarHolderStack>
          <ClassSetAction
            handleToggleUpdate={handleToggleUpdate}
            handleToggleDelete={handleToggleDelete}
            classSetId={flashcardSet?.classSetId}
          />
        </StarHolderStack>
      ) : (
        <></>
      )}
      {alertDelete.open ? (
        <DialogAlertDelete
          alertDelete={alertDelete}
          handleToggleAlertDelete={handleToggleDelete}
          onDelete={() => {
            onDelete(flashcardSet.classSetId, handleToggleDelete);
          }}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openEditForm ? (
        <FormClassSetDialog
          classSet={flashcardSet}
          handleToggle={handleToggleUpdate}
          updateClass={onUpdate}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
    </StackCardLink>
  );
};

export default React.memo(SetClass);
