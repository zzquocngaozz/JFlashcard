import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutNormal from "../components/Parts/LayoutNormal";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import ClassNav from "../components/Parts/ClassNav";
import useClassSet from "../hooks/useClassSet";
import useClassroom from "../hooks/useClassroom";
import SetClass from "../components/Cards/SetClass";
import { StackList } from "../components/Styled/StyledStack";
import { StackContain } from "../components/Styled/Container";
import SetSkeleton from "../components/FeedBack/SetSkeleton";
import AddClassSetDialog from "../components/Dialog/AddClassSetDialog";
import searhbanner from "../assets/images/searhbanner.png";

const ClassSet = () => {
  const { loading: loadingClass } = useClassroom();

  const {
    loading,
    mutationing,
    adding,
    classSets,
    addClassSet,
    deleteClassSet,
    updateClassSet,
  } = useClassSet();
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const handleToggleAdd = () => {
    setOpenAdd((prev) => !prev);
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <LayoutNormal>
      <Stack p={3} pr={5} pl={5}>
        {loading && loadingClass ? (
          <BackdropLoading />
        ) : (
          <>
            <ClassNav />
            <StackList pt={1} justifyContent={"space-between"}>
              <StackList>
                <Typography variant="h4">
                  Các bộ flashcard trong lớp học
                </Typography>
                <Tooltip title={"Thêm bộ flashcard"}>
                  <IconButton onClick={handleToggleAdd}>
                    <AddIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </StackList>
              <Pagination
                count={Math.ceil(classSets?.length / 6)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </StackList>
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
              {adding ? (
                <StackContain>
                  <SetSkeleton />
                  <SetSkeleton />
                  <SetSkeleton />
                </StackContain>
              ) : classSets?.length === 0 ? (
                <Stack
                  minHeight={300}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box width={70} height={70}>
                    <img src={searhbanner} loading="lazy" alt="notfound" />
                  </Box>
                  <Typography textAlign={"center"}>
                    Không có bộ flashcard nào trong lớp học
                  </Typography>
                </Stack>
              ) : (
                classSets
                  ?.slice(6 * (currentPage - 1), 6 * (currentPage - 1) + 6)
                  ?.map((set) => (
                    <SetClass
                      key={set.classSetId}
                      flashcardSet={set}
                      onDelete={deleteClassSet}
                      onUpdate={updateClassSet}
                      mutationing={mutationing}
                    />
                  ))
              )}
            </Stack>
          </>
        )}
      </Stack>
      {openAdd ? (
        <AddClassSetDialog
          handleToggle={handleToggleAdd}
          addClassSet={addClassSet}
        />
      ) : (
        <></>
      )}
    </LayoutNormal>
  );
};

export default ClassSet;
