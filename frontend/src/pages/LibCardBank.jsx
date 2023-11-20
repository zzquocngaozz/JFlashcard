import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fuzzySearch } from "../utils/search";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useLibCardBank from "../hooks/useLibCardBank";
import CardEdit from "../components/Cards/CardEdit";
import { getCardType } from "../utils/cardUtil";
import { StackList } from "../components/Styled/StyledStack";
import ImportFileDialog from "../components/Dialog/ImportFileDialog";
import SnapBarAlter from "../components/FeedBack/SnapBarAlter";
import useSnapBarAlert from "../hooks/useSnapBarAlert";
import AddCardMenu from "../components/Menu/AddCardMenu";
import searhbanner from "../assets/images/searhbanner.png";
import KanjiDialogForm from "../components/Dialog/KanjiDialogForm";
import VocaDialogForm from "../components/Dialog/VocaDialogForm";
import GrammarDialogForm from "../components/Dialog/GrammarDialogForm";
import { StackContain } from "../components/Styled/Container";
import SetSkeleton from "../components/FeedBack/SetSkeleton";
const LibCardBank = () => {
  const {
    cardBank: data,
    loading,
    mutationing,
    importing,
    importFile,
    addCard,
    updateCard,
    deleteCard,
  } = useLibCardBank();
  const { alert, setAlert, handleCloseSnackBar } = useSnapBarAlert();
  const [cardList, setCardList] = useState([]);
  const [paginList, setPaginList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [paramFilter, setParamFilter] = useState({
    type: 0,
    status: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [openImport, setOpenImport] = useState(false);
  const [openForm, setOpenForm] = useState({ open: false, type: 1 });
  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };

  const handleChangeTypeFilter = (e) => {
    setParamFilter({ ...paramFilter, type: e.target.value });
  };
  const handleChangeStatusFilter = (e) => {
    setParamFilter({ ...paramFilter, status: e.target.value });
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!data) {
        const result = data.filter((card) => {
          // return fuzzySearch(searchParam, card.term) &&
          // (paramFilter.type === 0 ? true : getCardType(card) === paramFilter)
          if (paramFilter.type === 0 && paramFilter.status === 0)
            return fuzzySearch(searchParam, card.term) && true;
          if (paramFilter.type !== 0 && paramFilter.status === 0)
            return (
              fuzzySearch(searchParam, card.term) &&
              getCardType(card) === paramFilter.type
            );
          if (paramFilter.type === 0 && paramFilter.status !== 0)
            return (
              fuzzySearch(searchParam, card.term) &&
              card.status === paramFilter.status
            );
          if (paramFilter.type !== 0 && paramFilter.status !== 0)
            return (
              fuzzySearch(searchParam, card.term) &&
              card.status === paramFilter.status &&
              getCardType(card) === paramFilter.type
            );
          return false;
        });
        setCardList(result);
        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter, data]);

  useEffect(() => {
    const startSet = 6 * (currentPage - 1);
    const endSet = startSet + 6;
    const pagingList = cardList?.slice(startSet, endSet);

    setPaginList(pagingList);
  }, [currentPage, cardList]);

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };

  const handleToggleImport = () => {
    setOpenImport((prev) => !prev);
  };
  const handleToggleForm = () => {
    setOpenForm({ ...openForm, open: !openForm.open });
  };
  const handleImport = (files, handleToggle) => {
    importFile(files, handleToggle, setAlert);
  };

  const handleOpenForm = (index) => {
    setOpenForm({ type: index, open: true });
  };

  useEffect(() => {
    document.title = "Kho thẻ của bạn";
  }, []);
  return (
    <>
      {loading ? (
        <StackContain>
          <SetSkeleton />
          <SetSkeleton />
          <SetSkeleton />
        </StackContain>
      ) : (
        <>
          <StackList justifyContent={"space-between"} mt={2}>
            <Typography variant="h6">Có {cardList.length} thẻ</Typography>
            <StackList>
              <AddCardMenu openForm={handleOpenForm} />
              <Tooltip title={"Nhập bằng file"}>
                <IconButton component={"label"} onClick={handleToggleImport}>
                  <CloudUploadIcon />
                  {/* <VisuallyHiddenInput type="file" onChange={importFile} /> */}
                </IconButton>
              </Tooltip>
            </StackList>
          </StackList>
          <Stack
            flexDirection={"row"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Stack
              alignItems={"center"}
              sx={{ flexDirection: "row", columnGap: "10px" }}
            >
              <TextField
                onChange={handleSearch}
                label="Có tên"
                variant="standard"
              />
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="filter-label">Loại thẻ</InputLabel>
                <Select
                  labelId="type-label"
                  id="type-label"
                  value={paramFilter.type}
                  onChange={handleChangeTypeFilter}
                  autoWidth
                  label="Lọc loại thẻ"
                  variant="standard"
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Hán tự</MenuItem>
                  <MenuItem value={2}>Từ vựng</MenuItem>
                  <MenuItem value={3}>Ngữ pháp</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="filter-label">Trạng thái</InputLabel>
                <Select
                  labelId="type-label"
                  id="type-label"
                  value={paramFilter.status}
                  onChange={handleChangeStatusFilter}
                  autoWidth
                  label="Lọc loại thẻ"
                  variant="standard"
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Nháp</MenuItem>
                  <MenuItem value={2}>Hoàn thành</MenuItem>
                  <MenuItem value={3}>Công khai</MenuItem>
                  <MenuItem value={4}>Đóng</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {cardList.length > 6 ? (
              <Pagination
                count={Math.ceil(cardList.length / 6.0)}
                color="primary"
                onChange={handleChangePaging}
              />
            ) : (
              <></>
            )}
          </Stack>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              paddingTop: "20px",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              rowGap: "30px",
              columnGap: "25px",
              transition: "all 1s ease",
            }}
          >
            {paginList.length === 0 ? (
              <Stack
                height={"100%"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={70}
                  height={70}
                >
                  <img src={searhbanner} alt="not found" />
                </Stack>
                <Typography textAlign={"center"}>
                  Kho thẻ rỗng, hãy tạo thêm thẻ hoặc thay đổi bộ lọc
                </Typography>
              </Stack>
            ) : (
              paginList?.map((card, index) => (
                <CardEdit
                  key={index}
                  index={index}
                  card={card}
                  onUpdate={updateCard}
                  onDelete={deleteCard}
                  mutationing={mutationing}
                />
              ))
            )}
          </Stack>
        </>
      )}
      {openImport ? (
        <ImportFileDialog
          handleToggle={handleToggleImport}
          importing={importing}
          importFile={handleImport}
        />
      ) : (
        <></>
      )}
      {openForm.open && openForm?.type === 1 ? (
        <KanjiDialogForm
          handleToggle={handleToggleForm}
          onSubmit={(newCar) => addCard(newCar, handleToggleForm)}
          mutationing={mutationing}
        />
      ) : openForm.open && openForm?.type === 2 ? (
        <VocaDialogForm
          handleToggle={handleToggleForm}
          onSubmit={(newCar) => addCard(newCar, handleToggleForm)}
          mutationing={mutationing}
        />
      ) : openForm.open && openForm?.type === 3 ? (
        <GrammarDialogForm
          handleToggle={handleToggleForm}
          onSubmit={(newCar) => addCard(newCar, handleToggleForm)}
          mutationing={mutationing}
        />
      ) : (
        <></>
      )}
      {alert.open ? (
        <SnapBarAlter alert={alert} handleCloseSnackBar={handleCloseSnackBar} />
      ) : (
        <></>
      )}
    </>
  );
};

export default LibCardBank;
