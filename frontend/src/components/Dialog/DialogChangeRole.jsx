import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogChangeRole({
  handleCloseChangeRole,
  requestRole,
}) {
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={true}>
        <DialogTitle>Về việc yêu cầu tài khoản giáo viên</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chúng tôi sẽ kiểm tra cân nhắc yêu cầu tài khoản giáo viên của bạn.
            Hãy chủ động liên lạc với email hỗ trợ của chúng tôi
            jflashcardsg50@gmail.com để hoàn thành thủ tục đăng ký tài khoản
            giáo viên
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button
            onClick={handleCloseChangeRole}
            type="button"
            color="error"
            variant="outlined"
          >
            Huỷ
          </Button> */}
          <Button
            onClick={handleCloseChangeRole}
            type="button"
            color="success"
            variant="outlined"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
