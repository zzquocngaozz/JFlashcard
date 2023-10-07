import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// truyền vào openDialog, setOpenDialog, defaultValue(optional)
export default function FormFolderDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo thư mục mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhóm các bộ thẻ liên quan vào một thư mục để việc học tập hiệu quả hơn
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên thư mục"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mô tả ngắn gọn"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleClose}>Tạo thư mục</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
