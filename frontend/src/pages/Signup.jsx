import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isBirthDate } from "../utils/datetimeCalc";
import { role } from "../utils/regexRole";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import useRegister from "../hooks/useRegister";
import Logo from "../assets/images/Logo.svg";
import registerbanner from "../assets/images/registerbanner.png";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import SignUpStepOne from "../components/Steps/SignUpStepOne";
import SignUpStepThree from "../components/Steps/SignUpStepThree";
import SignUpStepTwo from "../components/Steps/SignUpStepTwo";

const Signup = () => {
  //
  // const isAdding = useRef(false);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const changeStep = (step) => {
    setStep(step);
  };

  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();

  const { loading, registerAccount, getOtp, verifyOtp } = useRegister({
    setAlert,
  });

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);
  return (
    <Stack
      sx={{
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Stack
        flex={1}
        sx={{
          boxShadow: "0 0 5px rgba(20,255,23,0.5)",
          borderRadius: "5px",
          padding: "10px",
          paddingTop: "5rem",
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Đăng ký
        </Typography>
        {step === 1 ? (
          <SignUpStepOne
            loading={loading}
            setEmail={setEmail}
            getOtp={getOtp}
            changeStep={changeStep}
          />
        ) : step === 2 ? (
          <SignUpStepTwo
            email={email}
            loading={loading}
            getOtp={getOtp}
            verifyOtp={verifyOtp}
            changeStep={changeStep}
          />
        ) : step === 3 ? (
          <SignUpStepThree
            loading={loading}
            email={email}
            registerAccount={registerAccount}
          />
        ) : (
          <></>
        )}
      </Stack>
      <Box
        flex={1.25}
        sx={{
          bgcolor: "#09092D",
          padding: "10px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <Box
            width={70}
            height={70}
            sx={{ position: "absolute", top: 10, left: 30 }}
          >
            <img
              src={Logo}
              loading="lazy"
              alt="logo"
              style={{ objectFit: "fill", objectPosition: "center" }}
            />
          </Box>
        </Link>
        <Box width={600} height={500}>
          <img
            src={registerbanner}
            loading="lazy"
            alt="logo"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{ color: "#FFF", textAlign: "center", mt: 5, padding: "0 20%" }}
        >
          Thời điểm tốt nhất để bắt đầu học là ngay lúc này với JFlash!
        </Typography>
      </Box>
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        ""
      )}
      {loading ? <BackdropLoading /> : <></>}
    </Stack>
  );
};

export default Signup;
