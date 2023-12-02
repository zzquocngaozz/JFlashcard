import React, { useEffect, useRef } from "react";
import Navbar from "../components/Parts/Navbar";
import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getColorFromEnum } from "../utils/colorGetter";
import SendIcon from "@mui/icons-material/Send";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SchoolIcon from "@mui/icons-material/School";
import { ROLE } from "../utils/constant";
import FormVerify from "../components/Dialog/FormVerify";
import FormProfile from "../components/Dialog/FormProfile";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import DialogChangeRole from "../components/Dialog/DialogChangeRole";
import DialogVerifyPrompt from "../components/Dialog/DialogVerifyPrompt";
import { NavLink } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

const Profile = () => {
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseChangeRole = () => {
    setOpenChangeRole(false);
  };

  const [openVerify, setOpenVerify] = React.useState(false);
  const isShow = useRef(false);
  const {
    profile: currentUser,
    loading,
    updateProfile,
    getToken,
    verifyUser,
    requestRole,
  } = useProfile({
    setAlert,
    handleCloseUpdate,
    setOpenVerify,
    handleCloseChangeRole,
  });

  const [openVerifyNotify, setOpenVerifyNotify] = React.useState(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openChangeRole, setOpenChangeRole] = React.useState(false);

  const handleClickOpen = () => {
    getToken();
    // setOpenVerify(true);
  };

  const handleOpenChangeRole = () => {
    setOpenChangeRole(true);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpenVerify(false);
  };

  const verify = (data) => {
    verifyUser(data);
  };

  useEffect(() => {
    console.log(Boolean(currentUser));
    if (!Boolean(currentUser)) return;
    if (isShow.current) return;
    isShow.current = true;
    setOpenVerifyNotify(currentUser?.verify === false);
  }, [currentUser]);
  useEffect(() => {
    document.title = "Hồ sơ cá nhân";
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
        <Box
          flex={2}
          sx={{
            p: 3,
          }}
        >
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

        <Box
          flex={8}
          sx={{
            p: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              p: 5,
            }}
          >
            <Typography variant="h5" textAlign="left" mb={2}>
              Thông tin cá nhân
            </Typography>
            {loading ? (
              <BackdropLoading />
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Stack
                  flex={1}
                  sx={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {!loading ? (
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: `${getColorFromEnum(
                          currentUser?.userName[0]
                        )}`,
                      }}
                    >
                      {currentUser?.userName.toUpperCase()[0]}
                    </Avatar>
                  ) : (
                    ""
                  )}

                  <Box sx={{ cursor: "default", display: "flex" }}>
                    <Chip
                      label={ROLE[currentUser?.role]}
                      color="info"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    {currentUser?.verify ? (
                      <Chip
                        label="Đã xác minh"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Chưa xác minh"
                        sx={{ borderColor: "#ff9900", color: "#ff9900" }}
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {!currentUser?.verify ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 3, borderRadius: "20px" }}
                      endIcon={<SendIcon />}
                      onClick={handleClickOpen}
                    >
                      Lấy mã xác minh
                    </Button>
                  ) : currentUser?.role === 1 ? (
                    <Button
                      endIcon={<SchoolIcon />}
                      color="success"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        mt: 3,
                        borderRadius: "25px",
                      }}
                      onClick={handleOpenChangeRole}
                    >
                      Tôi là giáo viên
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button
                    endIcon={<ModeEditIcon />}
                    onClick={handleOpenUpdate}
                    variant="contained"
                    sx={{ borderRadius: "25px" }}
                  >
                    Cập nhật
                  </Button>
                </Stack>
                <Stack
                  flex={2.5}
                  sx={{
                    flexDirection: "column",
                    gap: "10px",
                    padding: "10px 80px",
                    marginTop: "20px",
                    "& input,& label": {
                      fontSize: "18px",
                    },
                  }}
                >
                  <Stack sx={{ flexDirection: "row", gap: 5 }}>
                    <TextField
                      id="firstName-helper-text"
                      type="text"
                      label="Họ"
                      variant="standard"
                      sx={{ width: "50%" }}
                      defaultValue={currentUser?.firstName}
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      id="lastName-helper-text"
                      type="text"
                      label="Tên"
                      defaultValue={currentUser?.lastName}
                      variant="standard"
                      sx={{ width: "50%" }}
                      inputProps={{ readOnly: true }}
                    />
                  </Stack>
                  <TextField
                    id="birthday-helper-text"
                    type="date"
                    defaultValue={currentUser?.birth}
                    label="Sinh nhật bạn"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    inputProps={{ readOnly: true }}
                  />
                  <TextField
                    id="username-helper-text"
                    type="text"
                    label="Tên tài khoản"
                    defaultValue={currentUser?.userName}
                    variant="standard"
                    inputProps={{ readOnly: true }}
                  />
                  <TextField
                    id="email-helper-text"
                    type="email"
                    label="Email"
                    defaultValue={currentUser?.email}
                    variant="standard"
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
              </Stack>
            )}
          </Box>
        </Box>
      </Stack>
      {openVerifyNotify ? (
        <DialogVerifyPrompt setOpenVerifyNotify={setOpenVerifyNotify} />
      ) : (
        ""
      )}
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        ""
      )}
      {openVerify ? (
        <FormVerify handleClose={handleClose} verify={verify} />
      ) : (
        ""
      )}
      {openChangeRole ? (
        <DialogChangeRole
          handleCloseChangeRole={handleCloseChangeRole}
          requestRole={requestRole}
        />
      ) : (
        ""
      )}
      {openUpdate ? (
        <FormProfile
          handleCloseUpdate={handleCloseUpdate}
          updateProfile={updateProfile}
          currentUser={currentUser}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
