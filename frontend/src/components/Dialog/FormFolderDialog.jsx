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
export default function FormFolderDialog({folder, handleToggle, updateFolder,mutationing}) {
  const [open, setOpen] = React.useState(false);
  const {register, handleSubmit,reset, formState:{errors,isDirty}} = useForm({defaultValues:{title:folder.title,description:folder.description}})


  return (
    <>
      <Dialog open={true}>
        <form noValidate onSubmit={handleSubmit(updateFolder)}>
          <DialogTitle>Cập nhật thư mục</DialogTitle>
          <DialogContent>
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
          <Button
              type="button"
              variant="contained"
              onClick={() => reset()}
              color="secondary"
              disabled={!isDirty||mutationing}
            >
              Cài lại
            </Button>
            <Button type='button' disabled={mutationing} onClick={handleToggle}>Huỷ</Button>
            <Button type='submit' disabled={!isDirty||mutationing} >Cập nhật</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
