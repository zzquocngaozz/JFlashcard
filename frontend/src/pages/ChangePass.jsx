import React, { useEffect } from "react";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Parts/Navbar";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import { useForm } from "react-hook-form";
import { role } from "../utils/regexRole";
import useChagePass from "../hooks/useChagePass";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

// REQUEST: ask be end point to change pass
const ChangePass = () => {
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      cfPassword: "",
    },
  });
  const { loading, changePass } = useChagePass({ setAlert });

  const onSubmit = (data) => {
    if (data.newPassword !== data.cfPassword) {
      setError("newPassword", {
        type: "manual",
        message: "Mật khẩu mới khác mật khẩu xác nhận ",
      });
      setError("cfPassword", {
        type: "manual",
        message: "Mật khẩu xác nhận khác mật khẩu mới ",
      });
    } else {
      clearErrors("newPassword");
      clearErrors("cfPassword");
      changePass(data);
    }
    //
  };

  const newPassword = watch("newPassword");
  const cfPassword = watch("cfPassword");

  useEffect(() => {
    if (newPassword === cfPassword) {
      clearErrors("newPassword");
      clearErrors("cfPassword");
    }
  }, [newPassword, cfPassword]);

  useEffect(() => {
    document.title = "Đổi mật khẩu";
  }, []);
  return (
    <>
      <Navbar />
      <Stack
        sx={{
          height: "calc(100vh - 64px)",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Box flex={2} sx={{ p: 3 }}>
          <List
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <NavLink to="/profile">
              <ListItem>Hồ sơ cá nhân</ListItem>
            </NavLink>
            <NavLink to="/changepass">
              <ListItem>Đổi mật khẩu</ListItem>
            </NavLink>
          </List>
        </Box>

        <Box flex={8} sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              p: 5,
              width: 500,
            }}
          >
            <Typography variant="h5" textAlign="left" mb={2}>
              Đổi mật khẩu
            </Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  {...register("password", role["password"])}
                  id="password-helper-text"
                  label="Mật khẩu"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
                <Button type="submit" disabled={!isDirty}>
                  Đổi mật khẩu
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Stack>
      {loading ? <BackdropLoading /> : <></>}
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangePass;
