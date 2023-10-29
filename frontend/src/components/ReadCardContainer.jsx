import {
  Alert,
  AlertTitle,
  Box,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFlashcardSetContext } from "../context/FlashcardSetContext";
import { Link } from "react-router-dom";
import { StackList } from "./Styled/StyledStack";
import ReadCard from "./Cards/ReadCard";
import useAuth from "../hooks/useAuth";

const ReadCardContainer = () => {
  const {
    cards,
    remain: remainCards,
    learnedCards,
    markedCards,
    handleToggleSelectCard,
  } = useFlashcardSetContext();

  useEffect(() => {}, []);

  const { isLogin } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  return (
    <Stack>
      <StackList justifyContent={"space-between"}>
        <Typography variant="h5" mt={2} mb={2}>
          {learnedCards.length === 0
            ? `Có ${cards.length} thẻ trong bộ này`
            : learnedCards.length <= cards.length
            ? `Bạn đang học ${learnedCards.length} thẻ trong bộ này`
            : learnedCards.length === cards.length
            ? `Bạn đã học xong bộ này.Hãy quay lại luyện tập thường xuyên`
            : ""}
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label={`Tất cả (${cards.length})`} {...a11yProps(0)} />
            <Tab
              label={`Đã học ${
                learnedCards.length !== 0 ? `(${learnedCards.length})` : ""
              }`}
              disabled={learnedCards.length === 0}
              {...a11yProps(1)}
            />
            <Tab
              label={`Chưa học ${
                remainCards.length !== 0 ? `(${remainCards.length})` : ""
              }`}
              disabled={remainCards.length === 0}
              {...a11yProps(2)}
            />
            <Tab
              label={`Đánh dấu ${
                markedCards.length !== 0 ? `(${markedCards.length})` : ""
              }`}
              disabled={markedCards.length === 0}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
      </StackList>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          {cards?.map((card, index) => (
            <ReadCard
              key={card.cardId}
              index={index}
              card={card}
              onSeclectCard={handleToggleSelectCard}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {learnedCards?.map((card, index) => (
            <ReadCard
              key={card.cardId}
              index={index}
              card={card}
              onSeclectCard={handleToggleSelectCard}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {remainCards?.map((card, index) => (
            <ReadCard
              key={card.cardId}
              index={index}
              card={card}
              onSeclectCard={handleToggleSelectCard}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {markedCards?.map((card, index) => (
            <ReadCard
              key={card.cardId}
              index={index}
              card={card}
              onSeclectCard={handleToggleSelectCard}
              selected={markedCards?.includes(card)}
            />
          ))}
        </CustomTabPanel>
      </Box>
    </Stack>
  );
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default ReadCardContainer;
