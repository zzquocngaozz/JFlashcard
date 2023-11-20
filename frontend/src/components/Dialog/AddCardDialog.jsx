import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoneIcon from "@mui/icons-material/Done";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useListCreatedSet from "../../hooks/useListCreatedSet";
import { StackList } from "../Styled/StyledStack";
import { useEffect } from "react";
import { fuzzySearch } from "../../utils/search";
import CardEdit from "../Cards/CardEdit";
import CardBank from "../Cards/CardBank";
import { useInitCardBankContext } from "../../context/SetEditContext";
import { getCardType } from "../../utils/cardUtil";
import { Link } from "react-router-dom";
import searhbanner from "../../assets/images/searhbanner.png";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function AddCardDialog({ handleToggle }) {
  const [searchParam, setSearchParam] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardList, setCardList] = React.useState(null);

  const [pagingList, setPaginList] = React.useState(null);
  const { loading, handleAddCardSet, selectCard, cardBank } =
    useInitCardBankContext();
  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };

  const handleChangeStatusFilter = (e) => {
    setParamFilter({ ...paramFilter, status: e.target.value });
  };

  const [paramFilter, setParamFilter] = React.useState({ type: 0, status: 0 });

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!cardBank) {
        const result = cardBank.filter((card) => {
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
          console.log(paramFilter);
          return false;
        });
        setCardList(result);
        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam, paramFilter, cardBank]);

  useEffect(() => {
    const startSet = 4 * (currentPage - 1);
    const endSet = startSet + 4;
    const pagingList = cardList?.slice(startSet, endSet);

    setPaginList(pagingList);
  }, [currentPage, cardList]);

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Dialog
        open={true}
        sx={{ "& .MuiPaper-root": { maxWidth: "calc(100vw - 50px)" } }}
        fullWidth
        onClose={handleToggle}
      >
        <DialogTitle>Thêm thẻ vào bộ</DialogTitle>
        <Stack
          alignItems={"center"}
          sx={{
            flexDirection: "row",
            columnGap: "10px",
            margin: "0 35px 10px 25px",
          }}
        >
          <TextField
            onChange={handleSearch}
            label="Có tên"
            variant="standard"
          />
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
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              rowGap: "20px",
            }}
          >
            {loading ? (
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    padding: "10px",
                    height: "50px",
                    borderRadius: "8px",
                    margin: "10px 10px 10px 0",
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    padding: "10px",
                    height: "50px",
                    borderRadius: "8px",
                    margin: "10px 10px 10px 0",
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    padding: "10px",
                    height: "50px",
                    borderRadius: "8px",
                    margin: "10px 10px 10px 0",
                  }}
                />
              </Box>
            ) : cardList?.length === 0 ? (
              <Stack
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={70}
                  height={70}
                >
                  <img src={searhbanner} alt="notfound" />
                </Stack>
                <StackList>
                  <Typography textAlign={"center"}>
                    Không có thẻ phù hợp
                  </Typography>
                  <Link to={"/my-lib/card-bank"}>Tạo thêm flashcard</Link>
                </StackList>
              </Stack>
            ) : (
              pagingList?.map((card, index) => (
                <CardBank card={card} key={index} index={index} />
              ))
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          {!!cardList ? (
            <Pagination
              count={Math.ceil(cardList?.length / 4.0)}
              color="primary"
              onChange={handleChangePaging}
            />
          ) : (
            <Pagination
              count={1}
              color="primary"
              onChange={handleChangePaging}
            />
          )}
          <StackList>
            <Button
              startIcon={<DoneIcon />}
              onClick={handleToggle}
              variant="contained"
              color="secondary"
            >
              Xong
            </Button>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={() => handleAddCardSet(handleToggle)}
              color="primary"
              variant="contained"
              disabled={selectCard.length === 0}
            >
              Thêm thẻ đã chọn
            </Button>
          </StackList>
        </DialogActions>
      </Dialog>
    </>
  );
}
