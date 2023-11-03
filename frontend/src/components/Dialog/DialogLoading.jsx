import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { CircularProgress, Stack } from "@mui/material";

export default function DialogLoading() {
  return (
    <>
      <Dialog
        open={true}
        sx={{
          background: "rgb(0 0 0 / 2%)",
          boxShadow: "none",
        }}
      >
        <Stack
          sx={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Stack>
      </Dialog>
    </>
  );
}
