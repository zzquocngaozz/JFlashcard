import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
const SelectBox = ({ onSelect }) => {
  const [select, setSelect] = useState(false);

  const handleSelect = () => {
    onSelect();
    setSelect(!select);
  };
  return (
    <>
      {!select ? (
        <Tooltip title={`Chọn`}>
          <IconButton onClick={handleSelect}>
            <CheckBoxOutlineBlankOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={`Bỏ chọn`}>
          <IconButton onClick={handleSelect}>
            <CheckBoxOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SelectBox;
