import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { role } from "../../utils/regexRole";
import { StackList } from "../Styled/StyledStack";

const SignUpStepTwo = ({ email, loading, getOtp, verifyOtp, changeStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: email, token: "" } });
  const onSubmit = (data) => {
    verifyOtp(data, changeStep);
  };

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
          <Stack textAlign={"center"}>
            <Typography>OTP đã gửi đến email{" " + email}</Typography>
            <Typography>Mã xác nhận chỉ có hiệu lực trong 15 phút</Typography>
          </Stack>
          <TextField
            {...register("token", role["token"])}
            id="OTP-helper-text"
            type="OTP"
            fullWidth
            label="OTP"
            error={!!errors.token}
            helperText={errors.token?.message}
            variant="standard"
          />

          <Button type="submit" variant="contained" disabled={loading}>
            Xác nhận
          </Button>
          <StackList justifyContent={"space-between"}>
            <Button
              type="button"
              disabled={loading}
              onClick={() => {
                changeStep(1);
              }}
            >
              Nhập lại email
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => {
                getOtp({ email: email }, changeStep);
              }}
            >
              Gửi lại mã
            </Button>
          </StackList>
        </Stack>
      </form>
    </>
  );
};

export default SignUpStepTwo;
