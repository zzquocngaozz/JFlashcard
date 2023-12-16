import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, CircularProgress, Stack, TextField, Zoom } from "@mui/material";
import { useForm } from "react-hook-form";
import { role } from "../../utils/regexRole";

export default function FormRejectDialog({
  alertDelete,
  handleToggleAlertDelete,
  onDelete,
  mutationing,
}) {
  const handleClose = (e) => {
    handleToggleAlertDelete(e);
  };

  const [message, setMessage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  React.useEffect(() => {
    if (!Boolean(message)) return;

    if (message.trim() === "") {
      setError("Hãy nhập mô tả để giáo viên có thể thay đổi");
      return;
    }
    if (message.trim().length >= 255) {
      setError("Mô tả không quá 255 ký tự");
      return;
    }
    console.log("khong loi");

    setError(null);
  }, [message]);

  const onSubmit = () => {
    // onDelete(data)
    if (!!error) return;
    if (!Boolean(message) || message.trim() === "") {
      setError("Mô tả không được trống");
      return;
    }
    if (Boolean(error)) return;
    onDelete({ token: message.replaceAll("\n", "<br/>") });
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog
        open={alertDelete.open}
        onClose={handleClose}
        onClick={(e) => {
          e.preventDefault();
        }}
        maxWidth={"md"}
        sx={{ "& .MuiPaper-root": { height: "400px" } }}
      >
        <DialogTitle>Từ chối công khai học phần</DialogTitle>
        <DialogContent>
          {mutationing ? (
            <Stack
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ rowGap: "20px" }}
            >
              <Zoom in={true}>
                <CircularProgress />
              </Zoom>
              <DialogContentText textAlign="center">
                {alertDelete.loadingMessage
                  ? alertDelete.loadingMessage
                  : "Đang xoá ...."}
              </DialogContentText>
            </Stack>
          ) : (
            <>
              <Stack
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Zoom in={true}>
                  <Box sx={{ color: "blue", mb: 2, textAlign: "center" }}>
                    <WarningAmberIcon sx={{ color: "#d8a200", fontSize: 54 }} />
                  </Box>
                </Zoom>
                <DialogContentText textAlign="center">
                  {alertDelete.message}
                </DialogContentText>
                <TextField
                  label={"Mô tả"}
                  error={Boolean(error)}
                  value={Boolean(message) ? message : ""}
                  onChange={handleChangeMessage}
                  multiline
                  rows={4}
                  fullWidth
                  helperText={!error ? "" : error}
                  sx={{ mt: 3 }}
                />
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            type="button"
            color="error"
            variant="contained"
            disabled={mutationing}
          >
            Huỷ
          </Button>
          <Button
            onClick={onSubmit}
            type="button"
            color="info"
            variant="contained"
            disabled={mutationing}
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
