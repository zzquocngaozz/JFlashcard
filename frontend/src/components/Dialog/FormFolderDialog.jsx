import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { role } from '../../utils/regexRole';

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: 
export default function FormFolderDialog({folder, handleToggle, updateFolder}) {
  const [open, setOpen] = React.useState(false);
  const {register, handleSubmit, formState:{errors,isDirty}} = useForm()


  return (
    <>
      <Dialog open={true} onClose={handleToggle}>
        <form noValidate onSubmit={handleSubmit(updateFolder)}>
          <DialogTitle>Tạo thư mục mới</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhóm các bộ thẻ liên quan vào một thư mục để việc học tập hiệu quả hơn
            </DialogContentText>
            <TextField
              {...register('title',{...role['title'],required:"Tiêu đề của thư mục không thể để trông"})}
              autoFocus
              margin="dense"
              id="name"
              label="Tên thư mục*"
              type="text"
              error={!!errors.title}
              helperText={errors?.title?.message}
              fullWidth
              variant="standard"
            />
            <TextField
              {...register('description',role['description'])}
              margin="dense"
              id="name"
              label="Mô tả ngắn gọn"
              type="text"
              multiline
              maxRows={4}
              error={!!errors.description}
              helperText={errors?.description?.message}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleToggle}>Huỷ</Button>
            <Button type='submit' disabled={!isDirty} >Cập nhật</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
