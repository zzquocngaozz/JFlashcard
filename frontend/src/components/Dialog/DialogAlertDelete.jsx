import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, CircularProgress, Stack, Zoom } from "@mui/material";

export default function DialogAlertDelete({
  alertDelete,
  handleToggleAlertDelete,
  onDelete,
  mutationing,
}) {
  const handleClose = (e) => {
    handleToggleAlertDelete(e);
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
                {alertDelete.loadingMessage
                  ? alertDelete.loadingMessage
                  : "Đang lưu ...."}
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
                    <WarningAmberIcon sx={{ color: "#d8a200", fontSize: 54 }} />
                  </Box>
                </Zoom>
                <DialogContentText textAlign="center">
                  {alertDelete.message}
                </DialogContentText>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            type="button"
            color="info"
            variant="contained"
            disabled={mutationing}
          >
            Huỷ
          </Button>
          <Button
            onClick={onDelete}
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
