import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Zoom } from '@mui/material';


export default function DialogVerifyPrompt({setOpenVerifyNotify}) {

    const handleClose = ()=>{
        setOpenVerifyNotify(false)
    }
  

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}


      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Hãy xác nhận email</DialogTitle>
        <DialogContent><Zoom in={true}>
          <Box sx={{color:"blue", mb:3, textAlign:"center"}}><InfoIcon sx={{fontSize:54}}/></Box></Zoom>
          <DialogContentText textAlign="center">
            Hãy xác nhận email để học và có cơ hội trở thành giáo viên để cung cấp tài liệu học tập chất lượng cho học sinh của bạn
            Trân trọng! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} type='button'  color='success' variant='outlined'>Đồng ý</Button>
        </DialogActions>
        
      </Dialog>
    </>
  );
}
