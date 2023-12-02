import {
  Box,
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
import React, { useEffect, useRef, useState } from "react";
import SideNavAdmin from "../components/Parts/SideNavAdmin";
import { Controller, useForm } from "react-hook-form";
import { isBirthDate } from "../utils/datetimeCalc";
import { role } from "../utils/regexRole";
import { Link } from "react-router-dom";
import useAddUser from "../hooks/useAddUser";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";

const UserAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors },
    control,
  } = useForm();

  const isAdding = useRef(false);

  const { loading, addUser, error } = useAddUser();
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  //
  // const [errorMessage,setErrorMessage] = useState(null)

  const onSubmit = (data) => {
    isAdding.current = true;
    addUser(data, reset);
  };

  useEffect(() => {
    // TH1 loading xong roi va error null == success, đang add
    if (!loading && !error && isAdding.current) {
      setAlert({
        ...alert,
        open: true,
        severity: "success",
        message: "Đã thêm người dùng mới thành công",
      });
      // clear Flag
      isAdding.current = false;
    }
    // TH2 loading xong roi va error == error
    if (!loading && !!error && isAdding.current) {
      setAlert({
        ...alert,
        open: true,
        severity: "error",
        message: error,
      });

      //clear flag
      isAdding.current = false;
    }
  }, [loading, error]);

  // handle validate birthday
  const birth = watch("birth");
  useEffect(() => {
    // neu birthday nhap roi va lon hon current date thi set loi
    if (!isBirthDate(birth) && birth !== "") {
      setError("birthday", {
        type: "manual",
        message: "Ngày sinh của bạn không hợp lệ!",
      });
    } else {
      clearErrors("birthday");
    }
  }, [birth]);

  useEffect(() => {
    document.title = "Thêm người dùng";
  }, []);
  return (
    <Stack flexDirection="row" sx={{ width: "100%", height: "100vh" }}>
      <SideNavAdmin />
      <Box
        flex={10}
        sx={{
          padding: "2rem",
          overflowY: "scroll",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper sx={{ maxWidth: 700 }}>
          <Typography variant="h3" textAlign="center" pt={5}>
            Tạo người dùng mới
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack
              // spacing={5}
              sx={{
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                padding: "10px 80px",
                marginTop: "20px",
                "& input,& label": {
                  fontSize: "18px",
                },
              }}
            >
              <Stack sx={{ flexDirection: "row", gap: 5 }}>
                <TextField
                  {...register("firstName", role["firstName"])}
                  id="firstName-helper-text"
                  type="text"
                  label="Họ"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  variant="standard"
                  sx={{ width: "50%" }}
                />
                <TextField
                  {...register("lastName", role["lastName"])}
                  id="lastName-helper-text"
                  type="text"
                  label="Tên"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  variant="standard"
                  sx={{ width: "50%" }}
                />
              </Stack>
              <TextField
                {...register("birth", {
                  required: "Vui lòng nhập ngày sinh của bạn",
                })}
                id="birthday-helper-text"
                type="date"
                label="Sinh nhật bạn"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.birth}
                helperText={errors.birth ? errors.birth.message : ""}
                variant="standard"
              />
              <TextField
                {...register("userName", role["userName"])}
                id="username-helper-text"
                type="text"
                label="Username"
                error={!!errors.userName}
                helperText={errors.userName?.message}
                variant="standard"
              />
              <TextField
                {...register("email", role["email"])}
                id="email-helper-text"
                type="email"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="standard"
              />
              <TextField
                {...register("password", role["password"])}
                id="password-helper-text"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="standard"
              />
              <FormControl>
                <InputLabel htmlFor="role">Loại tài khoản</InputLabel>
                <Controller
                  control={control}
                  name="role"
                  defaultValue={1}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="standard"
                      id="role"
                      sx={{ maxWidth: "50%", mt: 10, fontSize: "18px" }}
                    >
                      <MenuItem value={1}>Học sinh</MenuItem>
                      <MenuItem value={2}>Giáo viên</MenuItem>
                      <MenuItem value={4}>Kiểm duyệt viên</MenuItem>
                      <MenuItem value={3}>Quản trị viên</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 10,
                }}
              >
                <Button type="submit" variant="contained" disabled={loading}>
                  Tạo
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  LinkComponent={Link}
                  to="/users/list"
                  disabled={loading}
                >
                  Quay lại
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
        {alert.open ? (
          <SnapBarAlter
            alert={alert}
            handleCloseSnackBar={handleCloseSnackBar}
          />
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
};

export default UserAdd;
