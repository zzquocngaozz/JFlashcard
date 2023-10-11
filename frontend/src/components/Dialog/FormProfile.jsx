import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import { role } from '../../utils/regexRole';
import { Stack } from '@mui/material';

export default function FormProfile({handleCloseUpdate,updateProfile,currentUser}) {

  // const [openVerify, setOpenVerify] = React.useState(false);
  const {register,handleSubmit,reset,formState:{isDirty,errors}} = useForm({
    defaultValues:{
      firstName:currentUser.lastName,
      lastName:currentUser.firstName,
      birth:currentUser.birth
    }
  })

  const onSubmit=(data)=>{
    updateProfile(data)
  }
  
  // send token to be
  

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={true}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
          </DialogContentText> */}
            <Stack flexDirection="row" sx={{gap:"20px", mb:2}}>
                <TextField
                {...register("firstName",
                role['firstName']
                )}
                margin="dense"
                fullWidth
                id="firstName-helper-text"
                type='text'
                label="Họ"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="standard"
                InputLabelProps={{ shrink: true}}
                />
                <TextField
                {...register("lastName",
                role['lastName']
                )}
                margin="dense"
                fullWidth
                id="lastName-helper-text"
                type='text'
                label="Tên"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="standard"
                InputLabelProps={{ shrink: true}}
                />
            </Stack>
            <TextField
              {...register("birth",
              {required:'Vui lòng nhập ngày sinh của bạn'}
              )}
              id="birthday-helper-text"
              fullWidth
              type='date'
              label="Sinh nhật bạn"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.birth}
              helperText={errors.birth?errors.birth.message:""}
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} type='button'>Huỷ</Button>
          <Button type='submit' sx={{color:'#c8c803'}} disabled={!isDirty}>Cập nhật</Button>
          <Button onClick={() => {
            reset()
            }} type='button' sx={{color:"#000"}} disabled={!isDirty}>Đặt lại</Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
