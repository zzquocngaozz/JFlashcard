import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { utils, write } from "xlsx";

const ImportFileDialog = ({ handleToggle, importFile, importing }) => {
  const handleImportFile = (e) => {
    e.preventDefault();
    // console.log(e.target.files);
    importFile(e.target.files, handleToggle);
  };

  const handleDowload = (fileType) => {
    switch (fileType) {
      case 0:
        const data = [
          {
            "Thuật ngữ": "足",
            "Nghĩa Hán - Việt": "TÚC",
            "Ý nghĩa": "Chân, đủ",
            "Âm on": "そく",
            "Âm kun": "あし",
            "Mẹo nhớ": "Chân (足) quá ngắn không đủ(不足) để vào đội bóng rổ",
            "Ví dụ": "足が痛いんです",
            Nghĩa: "Chân e đau quá (/▽＼)",
            "Link ảnh":
              "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
          },
        ];

        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = utils.json_to_sheet(data);

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = write(wb, {
          bookType: "xlsx",
          type: "array",
          cellStyles: true,
        });

        const blob = new Blob([excelBuffer], { type: fileType });
        const fileName = "example" + fileExtension;

        // Tạo một đường dẫn URL cho tệp Excel
        const url = window.URL.createObjectURL(blob);

        // Tạo một liên kết ảo
        const link = document.createElement("a");
        link.href = url;
        link.download = "kanji_template.xlsx"; // Tên của tệp khi tải về
        // Thêm thẻ a vào DOM và kích hoạt việc tải xuống
        document.body.appendChild(link);
        link.click();

        // Xóa thẻ a sau khi tải xuống hoàn tất
        document.body.removeChild(link);
        console.log("import kanji");
        break;
      case 1:
        const dataVoca = [
          {
            "Thuật ngữ": "きょう",
            "Ý nghĩa": "Hôm nay",
            "Ví dụ": "きょうはあついですね",
            Nghĩa: "Trời hôm nay nóng nhỉ",
            "Link ảnh":
              "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
          },
        ];
        const fileTypeVoca =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const wsVoca = utils.json_to_sheet(dataVoca);
        const wbVoca = { Sheets: { data: wsVoca }, SheetNames: ["data"] };
        const excelBufferVoca = write(wbVoca, {
          bookType: "xlsx",
          type: "array",
        });

        const blobVoca = new Blob([excelBufferVoca], { type: fileTypeVoca });

        // Tạo một đường dẫn URL cho tệp Excel
        const urlVoca = window.URL.createObjectURL(blobVoca);

        // Tạo một liên kết ảo
        const linkVoca = document.createElement("a");
        linkVoca.href = urlVoca;
        linkVoca.download = "voca_template.xlsx"; // Tên của tệp khi tải về
        // Thêm thẻ a vào DOM và kích hoạt việc tải xuống
        document.body.appendChild(linkVoca);
        linkVoca.click();

        // Xóa thẻ a sau khi tải xuống hoàn tất
        document.body.removeChild(linkVoca);
        console.log("import voca");
        break;
      case 2:
        const dataGrammar = [
          {
            "Thuật ngữ": "～けど",
            "Ý nghĩa": "Tuy, nhưng mà",
            "Cách chia": "V辞書形、普通形・Aナイ形・Aイ形+けど、～",
            "Cách dùng/Lưu ý":
              "Là dạng liên từ, dùng để mào đầu, không dùng trong hội thoại trang trọng",
            "Ví dụ": "遊びに行きたいけど、お金がないのです",
            Nghĩa: "Tớ cũng muốn đi chơi nhưng mà không có tiền áˋ( ° ▽、° ) ",
            "Link ảnh":
              "https://cdn.tgdd.vn/Files/2021/08/31/1379210/cach-khac-phuc-loi-man-hinh-laptop-bi-den-tren-win-1.jpg",
          },
        ];

        const fileTypeGrammar =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

        const wsGrammar = utils.json_to_sheet(dataGrammar);
        const wbGrammar = { Sheets: { data: wsGrammar }, SheetNames: ["data"] };
        const excelBufferGrammar = write(wbGrammar, {
          bookType: "xlsx",
          type: "array",
        });

        const blobGrammar = new Blob([excelBufferGrammar], {
          type: fileTypeGrammar,
        });

        // Tạo một đường dẫn URL cho tệp Excel
        const urlGrammar = window.URL.createObjectURL(blobGrammar);

        // Tạo một liên kết ảo
        const linkGrammar = document.createElement("a");
        linkGrammar.href = urlGrammar;
        linkGrammar.download = "grammar_template.xlsx"; // Tên của tệp khi tải về
        // Thêm thẻ a vào DOM và kích hoạt việc tải xuống
        document.body.appendChild(linkGrammar);
        linkGrammar.click();

        // Xóa thẻ a sau khi tải xuống hoàn tất
        document.body.removeChild(linkGrammar);
        console.log("import grammar");
        break;
      default:
        break;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("onDrag");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove("onDrag");
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.target.classList.remove("onDrag");
    console.log(event.dataTransfer.files);
    importFile(event.dataTransfer.files, handleToggle);
  };

  return (
    <Dialog open={true} fullWidth maxWidth={"md"} onClose={handleToggle}>
      <DialogTitle>Nhập thẻ bằng file</DialogTitle>
      <DialogContent>
        {importing ? (
          <Stack
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ rowGap: "20px" }}
          >
            <Zoom in={true}>
              <CircularProgress />
            </Zoom>
            <DialogContentText textAlign="center">
              Đang nhập...
            </DialogContentText>
          </Stack>
        ) : (
          <Stack
            className="dragDropZone"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed rgba(0,0,0,1)",
              padding: "10px",
              "&.onDrag": {
                border: "1px dashed blue",
              },
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Typography>Kéo và thả file</Typography>
            <Typography>hoặc</Typography>
            <Tooltip title={"Nhập bằng file"}>
              <Box>
                <IconButton component={"label"}>
                  <CloudUploadIcon />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImportFile}
                  />
                </IconButton>
              </Box>
            </Tooltip>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Chip
          label="Tải file mẫu kanji"
          disabled={importing}
          onClick={() => handleDowload(0)}
        />
        <Chip
          label="Tải file mẫu từ vựng"
          disabled={importing}
          onClick={() => handleDowload(1)}
        />
        <Chip
          label="Tải file mẫu grammar"
          disabled={importing}
          onClick={() => handleDowload(2)}
        />
        <Chip
          label={"Huỷ"}
          component={Button}
          disabled={importing}
          onClick={handleToggle}
          color="error"
          sx={{ textTransform: "none" }}
        />
      </DialogActions>
    </Dialog>
  );
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default ImportFileDialog;
