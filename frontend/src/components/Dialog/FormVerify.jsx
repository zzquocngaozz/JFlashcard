import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import { role } from '../../utils/regexRole';


export default function FormVerify({handleClose, verify}) {
  // const [openVerify, setOpenVerify] = React.useState(false);
  const {register,handleSubmit,formState:{errors}} = useForm()

  return (
    <>
      <Dialog open={true}>        
        <form onSubmit={handleSubmit(verify)} noValidate>
        <DialogTitle>Xác nhận email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mã xác nhận đã được gửi đến email của bạn. Kiểm tra và nhập đúng mã để xác minh tài khoản!
          </DialogContentText>
          <TextField
              {...register("token",
              role['token']
              )}
              margin="dense"
              fullWidth
              id="token-helper-text"
              type='text'
              label="Mã xác nhận"
              error={!!errors.token}
              helperText={errors.token?.message}
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type='button' color='error'>Huỷ</Button>
          <Button type='submit'>Xác nhận</Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
