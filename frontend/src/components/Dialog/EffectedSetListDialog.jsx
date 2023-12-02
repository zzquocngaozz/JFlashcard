import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Chip,
  CircularProgress,
  DialogContentText,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { StackList } from "../Styled/StyledStack";
import { useEffect } from "react";
import { fuzzySearch } from "../../utils/search";
import { checkDueAt } from "../../utils/datetimeCalc";
import useTeacherCreatedSet from "../../hooks/useTeacherCreatedSet";
import { FLAG_STATUS } from "../../utils/constant";
import { Link } from "react-router-dom";
import SelectBox from "../Styled/SelectBox";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function EffectedSetListDialog({
  handleToggle,
  onSelectSet,
  setUpdateWaiting,
  mutationing,
  effectedSet,
  selectedList,
}) {
  const [searchParam, setSearchParam] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [listSet, setListSet] = React.useState(null);
  const [pagingList, setPaginList] = React.useState(null);
  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };
  const handleSelect = (flashcardSetId) => {
    onSelectSet(flashcardSetId);
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!effectedSet) {
        const result = effectedSet.filter((set) =>
          fuzzySearch(searchParam, set?.title)
        );
        setListSet(result);

        setCurrentPage(1);
      }
    }, [100]);

    return () => clearTimeout(filterData);
  }, [searchParam]);

  useEffect(() => {
    const startSet = 4 * (currentPage - 1);
    const endSet = startSet + 4;
    const pagingList = listSet?.slice(startSet, endSet);

    setPaginList(pagingList);
  }, [currentPage, listSet]);

  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Dialog
        open={true}
        sx={{ "& .MuiPaper-root": { maxWidth: "calc(100vw - 100px)" } }}
      >
        <DialogTitle>Những học phần bị ảnh hưởng</DialogTitle>
        <TextField
          onChange={handleSearch}
          label="Tìm kiếm"
          variant="outlined"
          sx={{ margin: "0 35px 0 25px" }}
        />
        <DialogContent sx={{ width: "600px", height: "700px" }}>
          {mutationing ? (
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
                Đang cập nhật
              </DialogContentText>
            </Stack>
          ) : (
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
                rowGap: "20px",
              }}
            >
              {pagingList?.length === 0 ? (
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
                    <FilterNoneIcon sx={{ fontSize: "3rem" }} />
                  </Stack>
                  <Typography textAlign={"center"}>
                    Không có bộ nào bị ảnh hưởng
                  </Typography>
                </Stack>
              ) : (
                pagingList?.map((set) => (
                  <StackList
                    key={set.flashcardSetId}
                    sx={{
                      padding: "10px",
                      // border: "1px solid rgba(0,0,0,0.2)",
                      width: "98%",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.45)",
                    }}
                  >
                    <StackList flexGrow={1} flexBasis={"50px"}>
                      <Typography
                        className="text--overflow"
                        sx={{ width: "250px" }}
                      >
                        {set?.title}
                      </Typography>
                      <Chip label={FLAG_STATUS[set?.status]} />
                    </StackList>
                    <StackList>
                      <SelectBox
                        onSelect={() => {
                          handleSelect(set.flashcardSetId);
                        }}
                        isSelected={Boolean(
                          selectedList.find(
                            (s) => s.flashcardSetId === set.flashcardSetId
                          )
                        )}
                      />
                      <Tooltip title={"Xem"}>
                        <Box>
                          <IconButton
                            variant="contained"
                            disabled={mutationing}
                            color="info"
                            LinkComponent={Link}
                            to={`/${set?.flashcardSetId}/edit`}
                          >
                            <VisibilityIcon
                              sx={{ width: "35px", height: "35px" }}
                            />
                          </IconButton>
                        </Box>
                      </Tooltip>
                    </StackList>
                  </StackList>
                ))
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          {!!listSet ? (
            <Pagination
              count={Math.ceil(listSet?.length / 4.0)}
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
              color="error"
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleToggle}
            >
              Để sau
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                setUpdateWaiting(1);
              }}
              color="primary"
              variant="contained"
            >
              Kiểm duyệt tất cả
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                setUpdateWaiting(2);
              }}
              disabled={selectedList.length === 0}
              color="primary"
              variant="contained"
            >
              Kiểm duyệt đã chọn
            </Button>
          </StackList>
        </DialogActions>
      </Dialog>
    </>
  );
}
