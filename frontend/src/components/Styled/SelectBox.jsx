import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
const SelectBox = ({ onSelect, isSelected }) => {
  const [select, setSelect] = useState(isSelected);

  const handleSelect = () => {
    onSelect();
    setSelect(!select);
  };
  return (
    <>
      {!select ? (
        <Tooltip title={`Chọn`}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleSelect();
            }}
          >
            <CheckBoxOutlineBlankOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={`Bỏ chọn`}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleSelect();
            }}
          >
            <CheckBoxOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SelectBox;
