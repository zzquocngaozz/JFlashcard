import { Box, Typography } from "@mui/material";
import React from "react";

const ShowMoreText = ({ props, children, maxWidth }) => {
  const [isReadMore, setIsReadMore] = React.useState(false);

  const handleToggle = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <Typography
        className={isReadMore ? "" : "text--overflow"}
        sx={{ maxWidth: { maxWidth } }}
      >
        {children}
      </Typography>
      {!isReadMore ? (
        <Box onClick={handleToggle}>Xem thêm</Box>
      ) : (
        <Box onClick={handleToggle}>Thu nhỏ</Box>
      )}
    </>
  );
};

export default ShowMoreText;
