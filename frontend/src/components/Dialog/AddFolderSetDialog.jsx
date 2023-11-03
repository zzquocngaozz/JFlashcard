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
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useListCreatedSet from "../../hooks/useListCreatedSet";
import { StackList } from "../Styled/StyledStack";
import { useEffect } from "react";
import { fuzzySearch } from "../../utils/search";

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function AddFolderSetDialog({
  handleToggle,
  setAdding,
  updateNumSet,
}) {
  const [searchParam, setSearchParam] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [listSet, setListSet] = React.useState(null);
  const [pagingList, setPaginList] = React.useState(null);
  const { listExist, loading, mutationing, addSetToFolder } = useListCreatedSet(
    { setAdding, updateNumSet }
  );
  const handleSearch = (e) => {
    setSearchParam(e.target.value.trim());
  };

  useEffect(() => {
    const filterData = setTimeout(() => {
      if (!!listExist) {
        const result = listExist.filter((set) =>
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

  useEffect(() => {
    setListSet(listExist);
  }, [listExist]);
  const handleChangePaging = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Dialog
        open={true}
        sx={{ "& .MuiPaper-root": { maxWidth: "calc(100vw - 100px)" } }}
        onClose={handleToggle}
      >
        <DialogTitle>Thêm bộ flashcard</DialogTitle>
        <TextField
          onChange={handleSearch}
          label="Tìm kiếm"
          variant="outlined"
          sx={{ margin: "0 35px 0 25px" }}
        />
        <DialogContent sx={{ width: "600px", height: "700px" }}>
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
            ) : pagingList?.length === 0 ? (
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
                  Không có bộ nào để thêm vào thư mục này
                </Typography>
              </Stack>
            ) : (
              pagingList?.map((set) => (
                <StackList
                  key={set.flashcardSetId}
                  sx={{
                    padding: "10px",
                    // border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.45)",
                  }}
                >
                  <StackList flexGrow={1} flexBasis={"50px"}>
                    <Typography>{set.title}</Typography>
                  </StackList>
                  <IconButton
                    variant="contained"
                    disabled={mutationing}
                    color="secondary"
                    onClick={() => addSetToFolder(set.flashcardSetId)}
                  >
                    <AddCircleIcon sx={{ width: "40px", height: "40px" }} />
                  </IconButton>
                </StackList>
              ))
            )}
          </Stack>
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
          <Button
            startIcon={<DoneIcon />}
            onClick={handleToggle}
            color="primary"
            variant="contained"
          >
            Xong
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
