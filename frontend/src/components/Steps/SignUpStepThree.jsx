import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { role } from "../../utils/regexRole";
import { Link } from "react-router-dom";
import { isBirthDate } from "../../utils/datetimeCalc";
import { useForm } from "react-hook-form";

const SignUpStepThree = ({ loading, email, registerAccount }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = (data) => {
    if (!isBirthDate(birth) && birth !== "") {
      setError("birth", {
        type: "manual",
        message: "Ngày sinh của bạn không hợp lệ!",
      });
    } else {
      clearErrors("birth");
      registerAccount(data, reset);
    }
  };

  // handle validate birthday
  const birth = watch("birth");
  useEffect(() => {
    // neu birthday nhap roi va lon hon current date thi set loi
    if (!isBirthDate(birth) && birth !== "") {
      setError("birth", {
        type: "manual",
        message: "Ngày sinh của bạn không hợp lệ!",
      });
    } else {
      clearErrors("birth");
    }
  }, [birth]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
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
            helperText={
              errors.birth
                ? errors.birth.message
                : "JFlashcards thu thập ngày sinh để chắc bạn đủ tuổi dùng thiết bị di động"
            }
            variant="standard"
          />
          <TextField
            {...register("userName", role["userName"])}
            id="username-helper-text"
            type="text"
            label="Tên tài khoản"
            error={!!errors.userName}
            helperText={errors.userName?.message}
            variant="standard"
          />
          <TextField
            {...register("password", role["password"])}
            id="password-helper-text"
            label="Mật khẩu"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="standard"
          />
          <Button type="submit" variant="contained" disabled={loading}>
            Đăng ký
          </Button>
          <Stack
            sx={{
              border: "1px solid blue",
              borderStyle: "double dashed",
              padding: "10px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="a">Huỷ đăng ký?</Typography>
            <Link to="/signin">Trở lại đăng nhập</Link>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default SignUpStepThree;
