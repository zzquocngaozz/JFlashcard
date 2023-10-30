import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { role } from "../../utils/regexRole";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function ClassPostForm({
  dataInit,
  handleToggle,
  onSubmit,
  mutationing,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm(!!dataInit ? { defaultValues: { ...dataInit } } : {});

  const submitForm = async (data) => {
    const strimData = { ...data, content: data.content.trim() };
    onSubmit(strimData);
  };

  return (
    <>
      <Dialog
        open={true}
        sx={{ "& .MuiPaper-root": { maxWidth: "calc(100vw - 100px)" } }}
      >
        <form
          noValidate
          onSubmit={handleSubmit(submitForm)}
          style={{ padding: "10px 20px" }}
        >
          <DialogTitle>{`${!dataInit ? "Tạo" : "Sửa"} bài đăng`}</DialogTitle>
          <DialogContent sx={{ width: "500px", display: "flex", gap: "60px" }}>
            <TextField
              {...register("content", role["postContent"])}
              label="Nội dung bài đăng"
              type="text"
              defaultValue={dataInit?.content}
              error={!!errors.content}
              multiline
              rows={2}
              helperText={errors?.content?.message}
              InputLabelProps={{ shrink: true }}
              variant="standard"
              sx={{ width: "100%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              variant="contained"
              onClick={() => reset()}
              color="secondary"
              disabled={!isDirty || mutationing}
              sx={{
                textTransform: "none",
              }}
            >
              Cài lại
            </Button>
            <Button
              type="button"
              disabled={mutationing}
              onClick={handleToggle}
              variant="contained"
              color="error"
              sx={{
                textTransform: "none",
              }}
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || mutationing}
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              {!dataInit ? "Tạo" : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
