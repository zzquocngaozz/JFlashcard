import React, { useEffect } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { role } from "../utils/regexRole";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useJoinClass from "../hooks/useJoinClass";
import BackdropLoading from "../components/FeedBack/BackdropLoading";

const JoinClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const navigate = useNavigate();

  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  const { loading, joinClass } = useJoinClass({ setAlert });

  useEffect(() => {
    document.title = "Tham gia lớp học";
  }, []);
  return (
    <>
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
            <Typography variant="h5">Tham gia lớp học</Typography>
            <Typography variant="h7">
              Tham gia vào lớp học để có những bộ flashcard chất lượng cho việc
              học tiếng Nhật của bạn
            </Typography>
            <br />
            <form onSubmit={handleSubmit(joinClass)} noValidate>
              <Stack flexDirection={"column"} sx={{ mt: "40px" }}>
                <TextField
                  {...register("classRoomCode", role["classCode"])}
                  id="title-helper-text"
                  type="text"
                  label="Mã lớp học*"
                  error={!!errors.classRoomCode}
                  helperText={errors.classRoomCode?.message}
                  variant="outlined"
                />
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "30px",
                    width: "100%",
                  }}
                >
                  <Button disabled={!isDirty} type="submit" variant="contained">
                    Tham gia
                  </Button>
                  <Button
                    color="error"
                    type="button"
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Huỷ
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Stack>
        {alert.open ? (
          <SnapBarAlter
            handleCloseSnackBar={handleCloseSnackBar}
            alert={alert}
          />
        ) : (
          <></>
        )}
        {loading ? <BackdropLoading /> : <></>}
      </LayoutNormal>
    </>
  );
};

export default JoinClass;
