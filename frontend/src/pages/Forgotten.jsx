import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { role } from "../utils/regexRole";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import Logo from "../assets/images/Logo.svg";
import forgottenbanner from "../assets/images/searhbanner.png";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

export default function Forgotten() {
  const navigate = useNavigate();
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  //TODO: chuyen sang thanh custom hook sau
  const [step, setStep] = useState(1);

  const handleChangeStep = (newStep) => {
    setStep(newStep);
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        height: "100vh",
      }}
    >
      {step === 1 ? (
        <RequestCodeForm
          handleChangeStep={handleChangeStep}
          setAlert={setAlert}
        />
      ) : (
        <ChangePass handleChangeStep={handleChangeStep} setAlert={setAlert} />
      )}

      <Box
        flex={1}
        sx={{ bgcolor: "#09092D", padding: "10px", position: "relative" }}
      >
        <Box
          width={70}
          height={70}
          sx={{ position: "absolute", top: 10, left: 10 }}
        >
          <img
            src={Logo}
            loading="lazy"
            alt="logo"
            style={{ objectFit: "fill", objectPosition: "center" }}
          />
        </Box>
        <Box
          width={200}
          height={100}
          sx={{ position: "center", margin: "200px 0px 0px 200px" }}
        >
          <img
            src={forgottenbanner}
            loading="lazy"
            alt="logo"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{ color: "#FFF", textAlign: "center", mt: 10 }}
        >
          Học và ghi nhớ thật hiệu quả với JFlashcard!
        </Typography>
      </Box>
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        <></>
      )}
    </Stack>
  );
}

function RequestCodeForm({ handleChangeStep, setAlert }) {
  const [loading, setLoading]  = useState(false)
  const {
    register, // ref 1 value in form hook
    handleSubmit, //
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.post("/forgot",JSON.stringify(data));
      setAlert({
        open: true,
        severity: "success",
        message:"Mã OTP đã được gửi tới email của bạn",
      });
      setLoading(false)
      handleChangeStep(2);
    } catch (error) {
      setLoading(false)
      setAlert({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errors?.body[0] || "Lỗi trả về không xác định",
      });
    }
  };

  return (
    <Box
      flex={1}
      sx={{
        boxShadow: "0 0 5px rgba(20,255,23,0.5)",
        borderRadius: "5px",
        padding: "10px",
        paddingTop: "6rem",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Quên mật khẩu
      </Typography>
      <Typography variant="h5" textAlign="center">
        Vui lòng nhập lại email đã đăng ký chúng tôi sẽ gửi cho bạn mã để đổi
        lại mật khẩu
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
          spacing={5}
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
          <TextField
            {...register("email", role["email"])}
            id="email-helper-text"
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="standard"
          />
          <Button type="submit" variant="contained">
            Gửi mã xác nhận
          </Button>
          <Stack
            sx={{
              border: "1px solid blue",
              borderStyle: "double dashed",
              padding: "8px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/signin">Quay lại đăng nhập</Link>
          </Stack>
        </Stack>
      </form>
      {loading?<BackdropLoading/>:<></>}
    </Box>
  );
}

function ChangePass({ handleChangeStep, setAlert }) {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register, // ref 1 value in form hook
    handleSubmit, //
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.put("/forgot",JSON.stringify(data));
      
      // handleChangeStep(1);
      navigate('/signin')
      setLoading(false)
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errors?.body[0] || "Lỗi trả về không xác định",
      });
      setLoading(false)
    }
  };

  return (
    <Box
      flex={1}
      sx={{
        boxShadow: "0 0 5px rgba(20,255,23,0.5)",
        borderRadius: "5px",
        padding: "10px",
        paddingTop: "6rem",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Quên mật khẩu
      </Typography>
      <Typography variant="h5" textAlign="center">
        Nhập mã xác nhận cùng với mật khẩu mới để hoàn thành đổi mật khẩu
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
          spacing={5}
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
          <TextField
            {...register("token", role["token"])}
            id="Code"
            label="Mã OTP"
            type="text"
            error={!!errors.token}
            helperText={errors.token?.message}
            variant="standard"
          />
          <TextField
            {...register("newPassword", role["password"])}
            id="new-password-helper-text"
            label="Mật khẩu mới"
            type="password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            variant="standard"
          />
          <TextField
            {...register("cfPassword", role["password"])}
            id="cf-password-helper-text"
            label="Mật khẩu xác nhận"
            type="password"
            error={!!errors.cfPassword}
            helperText={errors.cfPassword?.message}
            variant="standard"
          />
          <Button type="submit" variant="contained">
            Đổi mật khẩu
          </Button>
          <Stack
            sx={{
              border: "1px solid blue",
              borderStyle: "double dashed",
              padding: "8px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box onClick={()=>{
              handleChangeStep(1);
            }}
              sx={{cursor:"pointer"}}
            >Nhập lại mail</Box>
          </Stack>
        </Stack>
      </form>
      {loading?<BackdropLoading/>:<></>}
    </Box>
  );
}