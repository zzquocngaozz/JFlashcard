import * as React from "react";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

export default function ClassRoomCodeDialog({ code, handleTogleExpandCode }) {
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog
        open={true}
        fullWidth
        maxWidth={"md"}
        onClose={handleTogleExpandCode}
      >
        <DialogTitle variant="h5">Mã tham gia</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography
            textAlign={"center"}
            color={"primary"}
            sx={{ p: 10 }}
            variant="h1"
          >
            {code}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ position: "absolute", top: "5px", right: "15px" }}>
          <Tooltip title="Thu nhỏ">
            <IconButton
              onClick={handleTogleExpandCode}
              type="button"
              color="error"
              variant="outlined"
            >
              <ZoomInMapIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}
