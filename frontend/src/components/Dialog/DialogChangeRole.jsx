import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import { role } from '../../utils/regexRole';
import { Alert, Snackbar } from '@mui/material';

export default function DialogChangeRole({handleCloseChangeRole}) {
  
  

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={true}>
        <DialogTitle>Xác nhận email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chúng tôi sẽ kiểm tra cân nhắc yêu cầu tài khoản giáo viên của bạn. 
            Quá trình này có thể tốn thời gian 2 - 3 ngày. Khi yêu cầu được chấp nhận bạn sẽ nhận được email thông báo. 
            Trân trọng! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangeRole} type='button' color='error' variant='outlined'>Huỷ</Button>
          <Button  onClick={handleCloseChangeRole} type='button'  color='success' variant='outlined'>Đồng ý</Button>
        </DialogActions>
        
      </Dialog>
    </>
  );
}
