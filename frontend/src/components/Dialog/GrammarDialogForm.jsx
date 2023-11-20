import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { role } from "../../utils/regexRole";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import placeholder from "../../assets/images/placeholder.png";
import { checkImg } from "../../utils/manualTesting";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function GrammarDialogForm({
  dataInit,
  handleToggle,
  onSubmit,
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
  } = useForm(!!dataInit ? { defaultValues: { ...dataInit } } : {});
  const [imgPreview, setImgPreview] = React.useState(dataInit?.imgUrl);
  const imgUrl = watch("imgUrl");

  const submitForm = async (data) => {
    try {
      await new Promise((resolve, reject) => {
        checkImg(
          imgUrl,
          function () {
            setImgPreview(imgUrl);
            clearErrors("imgUrl");
            resolve(); // Khi kiểm tra hình ảnh hoàn thành thành công
          },
          function () {
            if (isDirty) {
              setImgPreview(null);
              setError("imgUrl", {
                type: "manual",
                message: "Hình ảnh không tồn tại",
              });
            }
            reject(); // Khi có lỗi kiểm tra hình ảnh
          }
        );
      });

      if (!errors?.imgUrl) {
        onSubmit(data);
      }
    } catch (error) {
      // Xử lý lỗi va link imgUrl empty thì cho qua va submit
      if (imgUrl === "") {
        clearErrors("imgUrl");
        onSubmit(data);
      }
    }
  };

  React.useEffect(() => {
    if (!!imgUrl)
      checkImg(
        imgUrl,
        function () {
          setImgPreview(imgUrl);
          clearErrors("imgUrl");
        },
        function () {
          if (isDirty) {
            setImgPreview(null);
            setError("imgUrl", {
              type: "manual",
              message: "Hình ảnh không tồn tại",
            });
          }
        }
      );
    if (imgUrl === "" && isDirty) {
      clearErrors("imgUrl");
    }
    if (!imgUrl) {
      setImgPreview("");
    }
  }, [imgUrl]);

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
          <DialogTitle>{`${
            !dataInit ? "Tạo" : "Sửa"
          } thẻ ngữ pháp`}</DialogTitle>
          <DialogContent sx={{ width: "900px", display: "flex", gap: "60px" }}>
            <Stack
              flex={6}
              sx={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: "20px",
                columnGap: "20px",
              }}
            >
              <TextField
                {...register("term", role["term"])}
                label="Thuật ngữ*"
                type="text"
                defaultValue={dataInit?.term}
                error={!!errors.term}
                helperText={errors?.term?.message}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "45%" }}
              />
              <TextField
                {...register("mean", role["mean"])}
                label="Ý nghĩa*"
                type="text"
                defaultValue={dataInit?.mean}
                error={!!errors.mean}
                helperText={errors?.mean?.message}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "45%" }}
              />
              <TextField
                {...register("combination", role["checkLength"])}
                label="Cách chia"
                type="text"
                defaultValue={dataInit?.combination}
                error={!!errors.combination}
                helperText={
                  !!errors.hint ? `Cách chia ${errors?.hint?.message}` : ""
                }
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "100%" }}
              />
              <TextField
                {...register("note", role["checkLength"])}
                label="Lưu ý"
                type="text"
                defaultValue={dataInit?.note}
                error={!!errors.note}
                helperText={
                  !!errors.note ? `Lưu ý ${errors?.note?.message}` : ""
                }
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "100%" }}
              />
              <TextField
                {...register("example", role["checkLength"])}
                label="Ví dụ"
                type="text"
                defaultValue={dataInit?.example}
                error={!!errors.example}
                helperText={
                  !!errors.example ? `Ví dụ ${errors?.example?.message}` : ""
                }
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "100%" }}
              />
              <TextField
                {...register("exampleMean", role["checkLength"])}
                label="Nghĩa của ví dụ"
                type="text"
                defaultValue={dataInit?.exampleMean}
                error={!!errors.exampleMean}
                helperText={
                  !!errors.exampleMean
                    ? `Ví dụ ${errors?.exampleMean?.message}`
                    : ""
                }
                InputLabelProps={{ shrink: true }}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Stack>
            <Stack flex={2} gap={2}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 100,
                  marginLeft: 0,

                  "& .MuiInputBase-root": {
                    marginTop: "8px",
                    marginBottom: "-3px",
                  },
                }}
              >
                <InputLabel id="filter-label" sx={{ left: "-18px" }}>
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type-label"
                  {...register("status")}
                  defaultValue={!!dataInit?.status ? dataInit?.status : 1}
                  autoWidth
                  label="Trạng thái"
                  variant="standard"
                >
                  <MenuItem value={1}>Nháp</MenuItem>
                  <MenuItem value={2}>Hoàn thành</MenuItem>
                  <MenuItem value={3}>Công khai</MenuItem>
                  <MenuItem value={4}>Đóng</MenuItem>
                </Select>
              </FormControl>
              <TextField
                {...register("imgUrl", role["imgUrl"])}
                label="Link ảnh"
                type="text"
                defaultValue={dataInit?.imgUrl}
                error={!!errors.imgUrl}
                helperText={!!errors.imgUrl ? `${errors?.imgUrl?.message}` : ""}
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
              <Box sx={{ width: "150px", height: "150px" }}>
                <img
                  alt="placeholder"
                  src={!imgPreview ? placeholder : imgPreview}
                />
              </Box>
            </Stack>
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
              onClick={handleToggle}
              variant="contained"
              color="error"
              disabled={mutationing}
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || mutationing}
              variant="contained"
            >
              {!dataInit ? "Tạo" : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
