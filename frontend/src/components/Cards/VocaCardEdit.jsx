import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogAlertDeleteCard from "../Dialog/DialogAlertDeleteCard";
import VocaDialogForm from "../Dialog/VocaDialogForm";
import placeholder from '../../assets/images/placeholder.png'

const VocaCardEdit = ({ card, index, onUpdate, onDelete, mutationing }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const handleToggleDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  const handleUpdate = (data) => {
    onUpdate(data, handleToggleForm);
  };

  return (
    <Stack
      key={index}
      component={Paper}
      bgcolor={"#fff"}
      m={"10px 0"}
      borderRadius={"8px"}
      height={300}
    >
      <Stack
        flexGrow={12}
        flexDirection={"row"}
        maxHeight={50}
        sx={{ borderBottom: "1px solid rgba(0,0,0,0.1)", padding: "10px 20px" }}
      >
        <Typography flex={5}>{index + 1}</Typography>
        <Tooltip title={"Chỉnh sửa"}>
          <IconButton
            sx={{ width: 30, height: 30, marginRight: "10px" }}
            onClick={handleToggleForm}
          >
            <ModeEditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Xoá thẻ"}>
          <IconButton
            sx={{ width: 30, height: 30 }}
            onClick={handleToggleDelete}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        flexDirection={"row"}
        height={"100%"}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack
          flex={2}
          height={"100%"}
          p={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6">{card?.term}</Typography>
        </Stack>

        <Stack flex={7} height={"100%"} p={1} position={"relative"} spacing={1}>
          <Stack>
            <Typography variant="span" sx={{ fontWeight: 500 }}>
              Ý nghĩa:
            </Typography>
            <Typography>
              <span className="text--up">{card?.chineseSound}</span> -{" "}
              {card?.mean}
            </Typography>
          </Stack>
          {!!card?.example || !!card?.exampleMean ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Ví dụ:
              </Typography>
              <Typography>{card?.example}</Typography>
              <Typography>{card?.exampleMean}</Typography>
            </Stack>
          ) : (
            <></>
          )}
          <Box
            sx={{ position: "absolute", right: 10, width: 150, height: 150 }}
          >
            {!!card?.imgUrl ? (
              <img
                src={card?.imgUrl}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
                alt="hint"
              />
            ) : (
              <></>
            )}
          </Box>
        </Stack>
      </Stack>
      {openForm ? (
        <VocaDialogForm
          handleToggle={handleToggleForm}
          dataInit={card}
          onSubmit={handleUpdate}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {openDelete ? (
        <DialogAlertDeleteCard
          handleToggle={handleToggleDelete}
          onDelete={() => {
            onDelete(card?.cardVocabId, handleToggleDelete);
          }}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default VocaCardEdit;
