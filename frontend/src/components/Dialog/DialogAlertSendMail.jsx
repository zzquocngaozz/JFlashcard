import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import { Box, CircularProgress, Stack, Zoom } from "@mui/material";

export default function DialogAlertSendMail({
  alertEmailSend,
  handleToggle,
  onSendMail,
  mutationing,
}) {
  const handleClose = (e) => {
    handleToggle();
  };

  return (
    <>
      <Dialog
        open={alertEmailSend.open}
        onClose={handleToggle}
        sx={{ "& .MuiPaper-root": { width: "500px", height: "300px" } }}
      >
        <DialogTitle>Thông báo của hệ thống</DialogTitle>
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
                Đang gửi email ...
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
                  <Box sx={{ color: "blue", mb: 3, textAlign: "center" }}>
                    <InfoIcon color="info" sx={{ fontSize: 54 }} />
                  </Box>
                </Zoom>
                <DialogContentText textAlign="center">
                  {alertEmailSend.message}
                </DialogContentText>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggle}
            type="button"
            color="info"
            variant="contained"
            disabled={mutationing}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              onSendMail(alertEmailSend.sendTo, handleToggle);
            }}
            type="button"
            color="error"
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
