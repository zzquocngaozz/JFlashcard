import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { role } from "../../utils/regexRole";
import { Stack } from "@mui/material";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO:
export default function FormClassSetDialog({
  classSet,
  handleToggle,
  updateClass,
  mutationing,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ...classSet,
      startAt: new Date(classSet.startAt).toISOString().slice(0, 16),
      dueAt: new Date(classSet.dueAt).toISOString().slice(0, 16),
    },
  });
  const dueAt = watch("dueAt");
  React.useEffect(() => {
    if (
      (new Date(dueAt).getTime() -
        new Date(classSet?.startAt).getTime() +
        60 * 1000) /
        (24 * 60 * 60 * 1000) <
      3
    ) {
      setError("dueAt", {
        type: "manual",
        message: `Due date must be at least 3 days after start time`,
      });
    } else {
      clearErrors("dueAt");
    }
  }, [dueAt]);

  const onSubmit = (data) => {
    if (
      (new Date(data?.dueAt).getTime() -
        new Date(data?.startAt).getTime() +
        60 * 1000) /
        (24 * 60 * 60 * 1000) <
      3
    ) {
      setError("dueAt", {
        type: "manual",
        message: `Due date must be at least 3 days after start time`,
      });
      return;
    }

    updateClass(data, handleToggle);
  };
  return (
    <>
      <Dialog
        open={true}
        fullWidth
        maxWidth={"sm"}
        onClose={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          // e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Cập nhật thời hạn</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              {...register("startAt")}
              id="startAt"
              label="Tạo lúc"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              helperText={"Thời gian tạo được lưu tự động"}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              {...register("dueAt")}
              margin="dense"
              id="dueAt"
              label="Thời hạn"
              InputLabelProps={{ shrink: true }}
              type="datetime-local"
              error={!!errors.dueAt}
              helperText={errors?.dueAt?.message}
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
              disabled={!isDirty || mutationing}
            >
              Cài lại
            </Button>
            <Button
              type="button"
              disabled={mutationing}
              variant="contained"
              color={"error"}
              onClick={handleToggle}
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || mutationing}
              variant="contained"
            >
              Cập nhật
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
