import React from 'react'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Box, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';


export default function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const theme = useTheme();
  
    const handleFirstPageButtonClick = (event) => {
        // quay lai page 1
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
        // quay lai page -1
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
        // chuyen den trang cuoi
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
         <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
            <LastPageIcon />
        </IconButton>
      </Box>
    );
  }