import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ShowMoreText = ({ children, maxWidth, maxLength }) => {
  const [isReadMore, setIsReadMore] = React.useState(false);
  const handleToggle = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Box position={"relative"}>
      <Typography
        className={isReadMore ? "" : "text--overflow2line"}
        sx={{ maxWidth: { maxWidth } }}
      >
        {children}
      </Typography>
      {children?.length >= maxLength ? (
        <>
          {!isReadMore || children?.includes("<br/>") ? (
            <Tooltip title="Xem thêm">
              <IconButton
                onClick={handleToggle}
                position={"absolute"}
                right={0}
                bottom={0}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Thu nhỏ">
              <IconButton onClick={handleToggle}>
                <ExpandLessIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ShowMoreText;
