import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { role } from "../../utils/regexRole";

const SignUpStepOne = ({ loading, setEmail, getOtp, changeStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });
  const onSubmit = (data) => {
    getOtp(data, changeStep);
    setEmail(data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
          // spacing={5}
          sx={{
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            padding: "10px 80px",
            marginTop: "20px",
            "& input,& label": {
              fontSize: "18px",
            },
          }}
        >
          <TextField
            {...register("email", role["email"])}
            id="email-helper-text"
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
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
            <Typography variant="a">Đã có tài khoản JFlashcards ?</Typography>
            <Link to="/signin">Trở lại đăng nhập</Link>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default SignUpStepOne;
