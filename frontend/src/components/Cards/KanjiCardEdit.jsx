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
import KanjiDialogForm from "../Dialog/KanjiDialogForm";
import DialogAlertDeleteCard from "../Dialog/DialogAlertDeleteCard";
import placeholder from "../../assets/images/placeholder.png";

const KanjiCardEdit = ({ card, index, onUpdate, onDelete, mutationing }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleToggleForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm]);

  const handleToggleDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  // truyen vao data form truyen vao luc handle submit va call back de dong form luc update thanh cong
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
      height={320}
      width={"100%"}
      sx={{
        overflowY: "scroll",
      }}
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

        <Stack
          flex={7}
          height={"100%"}
          p={1}
          position={"relative"}
          sx={{ "& p": { maxWidth: "calc(100% - 160px)" } }}
          spacing={1}
        >
          <Stack>
            <Typography variant="span" sx={{ fontWeight: 500 }}>
              Ý nghĩa:
            </Typography>
            <Typography>
              <span className="text--up">{card?.chineseSound}</span> -{" "}
              {card?.mean}
            </Typography>
          </Stack>
          <Stack sx={{ gap: 10, flexDirection: "row" }}>
            <Stack width={"40%"}>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Âm on:
              </Typography>
              <Typography>{card?.onSound}</Typography>
            </Stack>
            <Stack width={"40%"}>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Âm kun:
              </Typography>
              <Typography>{card?.kunSound}</Typography>
            </Stack>
          </Stack>
          {!!card?.trick ? (
            <Stack>
              <Typography variant="span" sx={{ fontWeight: 500 }}>
                Mẹo nhớ:
              </Typography>
              <Typography>{card?.trick}</Typography>
            </Stack>
          ) : (
            <></>
          )}
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
        <KanjiDialogForm
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
            onDelete(card?.cardId, handleToggleDelete);
          }}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default KanjiCardEdit;
