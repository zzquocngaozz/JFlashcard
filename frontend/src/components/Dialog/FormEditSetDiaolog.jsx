import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, set, useForm } from "react-hook-form";
import { role } from "../../utils/regexRole";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function FormEditSetDiaolog({
  flashcardSet,
  handleToggleUpdateSet,
  updateSet,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm();

  return (
    <>
      <Dialog open={true}>
        <form noValidate onSubmit={handleSubmit(updateSet)}>
          <DialogTitle>Cập nhật thông tin của bộ flashcard</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ width: "100%", height: "100%" }}>
              <TextField
                {...register("title", role["title"])}
                margin="dense"
                id="name"
                label="Tên bộ flashcard*"
                type="text"
                defaultValue={flashcardSet?.title}
                error={!!errors.title}
                helperText={errors?.title?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
              <TextField
                {...register("description", role["description"])}
                margin="dense"
                id="name"
                label="Mô tả ngắn gọn"
                type="text"
                multiline
                maxRows={4}
                defaultValue={flashcardSet?.description}
                error={!!errors.description}
                helperText={errors?.description?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
              <FormControl flex={1}>
                <InputLabel htmlFor="typeSet">Trạng thái</InputLabel>
                <Controller
                  control={control}
                  name="status"
                  defaultValue={flashcardSet?.status}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="standard"
                      id="status"
                      sx={{ width: "150px", mt: 10, fontSize: "18px" }}
                    >
                      <MenuItem value={1}>Nháp</MenuItem>
                      <MenuItem value={2}>Hoàn thành</MenuItem>
                      <MenuItem value={3}>Công khai</MenuItem>
                      <MenuItem value={4}>Đóng</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={handleToggleUpdateSet}
              variant="contained"
              color="error"
            >
              Huỷ
            </Button>
            <Button type="submit" disabled={!isDirty} variant="contained">
              Cập nhật
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
