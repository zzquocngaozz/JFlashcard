import React, { useEffect, useState } from "react";
import { useInitFlashcardSetContext } from "../context/FlashcardSetContext";
import { Link, useLocation, useParams } from "react-router-dom";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import { isEmpty } from "../utils/manualTesting";
import LearnSetWidget from "../components/LearnSetWidget";

const LearnSet = () => {
  const { loading, cards, remain, learnedCards, markedCards } =
    useInitFlashcardSetContext();
  const { setId } = useParams();
  const [learnList, setLearnList] = useState([]);
  const [indexCard, setIndexCard] = useState(-1);
  const location = useLocation();

  useEffect(() => {
    if (isEmpty(learnList) && !isEmpty(cards)) {
      const learnMode = location?.state?.learnMode;

      if (learnMode === undefined) {
        if (learnedCards?.length === cards?.length) {
          setLearnList(cards);
          setIndexCard(0);
          return;
        } else {
          setLearnList([...learnedCards, ...remain]);
          setIndexCard(learnedCards?.length);
          return;
        }
      }

      if (learnMode === 0) {
        setLearnList([...cards]);
        setIndexCard(0);
        return;
      }

      if (learnMode === 1) {
        setLearnList([...learnedCards, ...remain]);
        setIndexCard(learnedCards?.length);
        return;
      }
      if (learnMode === 2) {
        setLearnList([...markedCards]);
        setIndexCard(0);
        return;
      }
    }
  }, [setId, cards]);
  return (
    <>
      {isEmpty(learnList) ? (
        <BackdropLoading />
      ) : (
        <>
          <LearnSetWidget indexCard={indexCard} learnList={learnList} />
        </>
      )}
      {/* <Stack p={3} pr={16} pl={16}>
      </Stack> */}
    </>
  );
};

export default LearnSet;
