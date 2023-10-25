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
export default function FormClassDialog({
  classroom,
  handleToggle,
  updateClass,
  mutationing,
}) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      classRoomName: classroom.classRoomName,
      description: classroom.description,
    },
  });

  return (
    <>
      <Dialog open={true} fullWidth maxWidth={"sm"}>
        <form noValidate onSubmit={handleSubmit(updateClass)}>
          <DialogTitle>Cập nhật thư mục</DialogTitle>
          <DialogContent>
            <TextField
              {...register("classRoomName", role["className"])}
              autoFocus
              margin="dense"
              id="name"
              label="Tên lớp học*"
              type="text"
              error={!!errors.classRoomName}
              helperText={errors?.classRoomName?.message}
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("description", role["description"])}
              margin="dense"
              id="name"
              label="Mô tả ngắn gọn"
              type="text"
              multiline
              rows={3} // Đặt rows là 4 để đảm bảo chiều cao ban đầu
              maxRows={4} // Đặt maxRows là 4 để giới hạn số dòng tối đa
              fullWidth
              error={!!errors.description}
              helperText={errors?.description?.message}
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
