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
  CircularProgress,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Zoom,
} from "@mui/material";
import { getDateDefault, isPublicDate } from "../../utils/datetimeCalc";
import useAuth from "../../hooks/useAuth";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function FormEditSetDiaolog({
  flashcardSet,
  handleToggleUpdateSet,
  updateSet,
  mutationing,
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ...flashcardSet,
      publicAt: flashcardSet.publicAt.split("T")[0],
    },
  });

  const publicAt = watch("publicAt");

  const onSubmit = (data) => {
    if (publicAt < flashcardSet.createdAt && publicAt !== "") {
      setError("birth", {
        type: "manual",
        message:
          "Ngày công khai thẻ lớn hơn hoặc bằng ngày tạo " +
          flashcardSet.createdAt,
      });
    } else {
      updateSet(data);
      clearErrors("publicAt");
    }
  };

  React.useEffect(() => {
    // neu public at < current thi loi
    if (!publicAt) return;
    console.log(publicAt >= flashcardSet.createdAt);
    if (publicAt < flashcardSet.createdAt && publicAt !== "") {
      setError("publicAt", {
        type: "manual",
        message:
          "Ngày công khai thẻ lớn hơn hoặc bằng ngày ngày tạo " +
          flashcardSet.createdAt,
      });
    } else {
      clearErrors("publicAt");
    }
  }, [publicAt]);

  const { currentUser } = useAuth();

  return (
    <>
      <Dialog open={true}>
        {mutationing ? (
          <Stack
            width={"370px"}
            height={"320px"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ rowGap: "20px" }}
          >
            <Zoom in={true}>
              <CircularProgress />
            </Zoom>
            <DialogContentText textAlign="center">
              Đang cập nhật
            </DialogContentText>
          </Stack>
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                <TextField
                  {...register("publicAt", {
                    required: "Hãy chọn ngày bạn muốn public bộ thẻ này",
                  })}
                  id="publicAt-helper-text"
                  type="date"
                  label="Ngày công khai"
                  defaultValue={flashcardSet.publicAt.split("T")[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.publicAt}
                  helperText={errors.publicAt?.message}
                  variant="standard"
                  sx={{
                    display: `${
                      currentUser?.role === 2 ? "inline-flex" : "none"
                    }`,
                  }}
                />
                {currentUser.role === 1 ? (
                  <FormControl>
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
                          <MenuItem value={4} sx={{ display: "none" }}>
                            Đóng
                          </MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                ) : currentUser.role === 2 ? (
                  // <FormControl flex={1}>
                  //   <InputLabel htmlFor="typeSet">Trạng thái</InputLabel>
                  //   <Controller
                  //     control={control}
                  //     name="status"
                  //     defaultValue={flashcardSet?.status}
                  //     render={({ field }) => (
                  //       <Select
                  //         {...field}
                  //         variant="standard"
                  //         id="status"
                  //         sx={{ width: "150px", mt: 10, fontSize: "18px" }}
                  //       >
                  //         <MenuItem value={1}>Nháp</MenuItem>
                  //         <MenuItem value={2}>Hoàn thành</MenuItem>
                  //         <MenuItem value={3} sx={{ display: "none" }}>
                  //           Công khai
                  //         </MenuItem>
                  //         <MenuItem value={5}>Chờ duyệt</MenuItem>
                  //         <MenuItem value={6} sx={{ display: "none" }}>
                  //           Chặn
                  //         </MenuItem>
                  //         <MenuItem value={4}>Đóng</MenuItem>
                  //       </Select>
                  //     )}
                  //   />
                  // </FormControl>
                  <></>
                ) : (
                  <></>
                )}
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
        )}
      </Dialog>
    </>
  );
}
