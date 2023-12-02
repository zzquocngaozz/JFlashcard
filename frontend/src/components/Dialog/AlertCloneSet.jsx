import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import { Box, CircularProgress, Stack, Zoom } from "@mui/material";

export default function AlertCloneSet({
  alertClone,
  handleToggle,
  onClone,
  cloning,
}) {
  const handleClose = (e) => {
    handleToggle();
  };

  return (
    <>
      <Dialog
        open={alertClone.open}
        onClose={handleToggle}
        sx={{ "& .MuiPaper-root": { width: "500px", height: "300px" } }}
      >
        <DialogTitle>Thông báo của hệ thống</DialogTitle>
        <DialogContent>
          {cloning ? (
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
                Đang sao chép ...
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
                  {alertClone.message}
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
            disabled={cloning}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              onClone(alertClone.mode);
            }}
            type="button"
            color="error"
            variant="contained"
            disabled={cloning}
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
