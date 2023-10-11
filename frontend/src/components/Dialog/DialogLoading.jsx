import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import { Box, CircularProgress, Stack, Zoom } from '@mui/material';


export default function DialogLoading() {

   
  

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}


      <Dialog open={true} sx={{
        background: "rgb(0 0 0 / 2%)",
        boxShadow:"none"
      }}>
        <Stack sx={{width:100, height:100, justifyContent:"center", alignItems:"center"}}>
            <CircularProgress />
        </Stack>
      </Dialog>
    </>
  );
}
