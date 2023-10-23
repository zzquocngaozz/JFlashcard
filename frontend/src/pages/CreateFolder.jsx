import React from 'react'
import LayoutNormal from '../components/Parts/LayoutNormal'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { role } from '../utils/regexRole';
import useCreateFolder from '../hooks/useCreateFolder';

const CreateFolder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm();
  const navigate = useNavigate();

  const { loading, createFolder } = useCreateFolder();


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
          <Typography variant="h5">Tạo thư mục</Typography>
          <Typography variant="h7">Nhóm những học phần liên quan vào để việc tìm và ôn tập chúng dễ dàng hơn</Typography>
          <br />
          <form onSubmit={handleSubmit(createFolder)} noValidate>
            <Stack flexDirection={"column"} sx={{ gap: "20px", mt:"40px" }}>
              <TextField
                {...register("title", role["title"])}
                id="title-helper-text"
                type="text"
                label="Tiêu đề*"
                error={!!errors.title}
                helperText={errors.title?.message}
                variant="outlined"
              />
              <TextField
                {...register("description", role["description"])}
                id="description-helper-text"
                type="text"
                label="Mô tả"
                multiline
                rows={2}
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
                <Button disabled={!isDirty} type="submit" variant="contained">
                  Tạo
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
    </LayoutNormal>
    </>
  )
}

export default CreateFolder