import { Alert, Snackbar, IconButton} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

// export const alert = {
//   error:<MUIAlert severity = "error" message = "This is error message alert -- Check it out!" />,
//   success:<MUIAlert severity = "success" message = "This is message success alert -- Check it out!" />,
//   info:<MUIAlert severity = "info" message = "This is message info alert -- Check it out!" />,
//   warn:<MUIAlert severity = "warn" message = "This is message warn alert -- Check it out!" />,
// }

const SnapBarAlter =  ({alert, handleCloseSnackBar}) => {

  return (
    <Snackbar
    sx={{maxWidth:400}}
    open = {alert.open}
    // set snackbar position
    anchorOrigin={{vertical:'top',horizontal:'right'}}
    // handle close snackbar
    // set autoHide duration minisecond
    autoHideDuration={3000}
    onClose={handleCloseSnackBar}
    // message="Hello world"
    action={<IconButton
      size="small"
      color="inherit"
      onClick={handleCloseSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>}
    >
        <Alert severity={alert.severity} onClose={handleCloseSnackBar}>{alert.message}</Alert>
    </Snackbar>
  )
}

export default SnapBarAlter