import React, { useEffect } from "react";
import LayoutNormal from "../components/Parts/LayoutNormal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { role } from "../utils/regexRole";
import useCreateClass from "../hooks/useCreateClass";

const CreateClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const navigate = useNavigate();

  const { loading, createClass } = useCreateClass();

  useEffect(() => {
    document.title = "Tạo lớp học";
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
            <Typography variant="h5">Tạo lớp học</Typography>
            <Typography variant="h7">
              Tạo lớp học của bạn để chia sẻ những bộ flashcard chất lượng cho
              học viên.
            </Typography>
            <br />
            <form onSubmit={handleSubmit(createClass)} noValidate>
              <Stack flexDirection={"column"} sx={{ gap: "20px", mt: "40px" }}>
                <TextField
                  {...register("className", role["title"])}
                  id="title-helper-text"
                  type="text"
                  label="Tiêu đề*"
                  error={!!errors.className}
                  helperText={errors.className?.message}
                  variant="outlined"
                />
                <TextField
                  {...register("description", role["description"])}
                  id="description-helper-text"
                  type="text"
                  label="Mô tả"
                  multiline
                  rows={2}
                  maxRows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
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
                  <Button
                    disabled={!isDirty || loading}
                    type="submit"
                    variant="contained"
                  >
                    Tạo lớp học
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
    </>
  );
};

export default CreateClass;
