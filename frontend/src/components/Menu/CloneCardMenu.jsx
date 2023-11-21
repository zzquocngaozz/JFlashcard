import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import useAuth from "../../hooks/useAuth";
import SaveIcon from "@mui/icons-material/Save";
import { useFlashcardSetContext } from "../../context/FlashcardSetContext";
const CloneCardMenu = ({ handleTogleClone }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { markedCards } = useFlashcardSetContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectModeClone = (index) => {
    setAnchorEl(null);
    handleTogleClone(index);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Sao chép thẻ">
          <IconButton
            onClick={handleClick}
            color="primary"
            size="small"
            sx={{ ml: 2 }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="add-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => selectModeClone(0)}>
          <ListItemText>Tất cả</ListItemText>
        </MenuItem>
        <MenuItem
          disabled={markedCards.length === 0}
          onClick={() => selectModeClone(1)}
        >
          <ListItemText>Mhững thẻ đã chọn</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CloneCardMenu;
