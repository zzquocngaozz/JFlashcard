import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Zoom } from "@mui/material";

export default function DialogAlertDeletePost({ onDelete, handleToggle }) {
  const handleClose = () => {
    handleToggle();
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Cảnh báo của hệ thống</DialogTitle>
        <DialogContent>
          <Zoom in={true}>
            <Box sx={{ color: "blue", mb: 3, textAlign: "center" }}>
              <WarningAmberIcon sx={{ color: "#d8a200", fontSize: 54 }} />
            </Box>
          </Zoom>
          <DialogContentText textAlign="center">
            Thao tác không thể ngắt bạn có chắc muốn bài đăng này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            type="button"
            color="info"
            variant="contained"
            textTrasform={"none"}
          >
            Huỷ
          </Button>
          <Button
            onClick={onDelete}
            type="button"
            color="error"
            variant="contained"
            textTrasform={"none"}
          >
            Xoá bài
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
