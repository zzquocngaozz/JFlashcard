import React, { useEffect } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { role } from "../utils/regexRole";
import { useNavigate } from "react-router-dom";
import useAddSet from "../hooks/useAddSet";
import useAuth from "../hooks/useAuth";
import {
  getDateDefault,
  isBirthDate,
  isPublicDate,
} from "../utils/datetimeCalc";

const CreateSet = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    control,
  } = useForm();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { loading, createSet } = useAddSet();

  const publicAt = watch("publicAt");

  const onSubmit = (data) => {
    if (!isPublicDate(data.publicAt) && publicAt !== "") {
      setError("publicAt", {
        type: "manual",
        message: "Ngày công khai thẻ lớn hơn hoặc bằng ngày hiện tại",
      });
    } else {
      createSet(data);
      clearErrors("publicAt");
    }
  };

  useEffect(() => {
    // neu public at < current thi loi
    if (!publicAt) return;
    if (!isPublicDate(publicAt) && publicAt !== "") {
      setError("publicAt", {
        type: "manual",
        message: "Ngày công khai thẻ lớn hơn hoặc bằng ngày hiện tại",
      });
    } else {
      clearErrors("publicAt");
    }
  }, [publicAt]);

  useEffect(() => {
    document.title = "Tạo học phần";
  }, []);

  return (
    <LayoutNormal>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "calc(100vh - 65px)",
        }}
      >
        <Paper sx={{ padding: "30px", width: 500, maxHeight: 500 }}>
          <Typography variant="h5">Tạo bộ mới</Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack flexDirection={"column"} sx={{ gap: "20px" }}>
              <TextField
                {...register("title", role["title"])}
                id="title-helper-text"
                type="text"
                label="Tiêu đề*"
                error={!!errors.title}
                helperText={errors.title?.message}
                variant="standard"
              />
              <TextField
                {...register("description", role["description"])}
                id="description-helper-text"
                type="text"
                label="Mô tả"
                multiline
                maxRows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                variant="standard"
              />

              <TextField
                {...register("publicAt", {
                  required: "Hãy chọn ngày bạn muốn public bộ thẻ này",
                })}
                id="publicAt-helper-text"
                type="date"
                label="Ngày công khai"
                defaultValue={getDateDefault()}
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
              <Stack flexDirection={"row"} sx={{ gap: "50px", width: "100%" }}>
                <FormControl>
                  <InputLabel htmlFor="type">Loại thẻ</InputLabel>
                  <Controller
                    control={control}
                    name="type"
                    defaultValue={1}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="standard"
                        id="type"
                        sx={{ width: "150px", mt: 10, fontSize: "18px" }}
                      >
                        <MenuItem value={1}>Hán tự</MenuItem>
                        <MenuItem value={2}>Từ vựng</MenuItem>
                        <MenuItem value={3}>Ngữ pháp</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {/* <FormControl flex={1}>
                  <InputLabel htmlFor="typeSet">Chế độ</InputLabel>
                  <Controller
                    control={control}
                    name="isPrivate"
                    defaultValue={false}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="standard"
                        id="isPrivate"
                        sx={{ width: "150%", mt: 10, fontSize: "18px" }}
                      >
                        <MenuItem value={false}>Công khai</MenuItem>
                        <MenuItem value={true}>Riêng tư</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl> */}
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                <Button
                  disabled={!isDirty || loading}
                  type="submit"
                  variant="contained"
                >
                  Tạo
                </Button>
                <Button
                  color="error"
                  type="button"
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                  disabled={loading}
                >
                  Huỷ
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </LayoutNormal>
  );
};

export default CreateSet;
