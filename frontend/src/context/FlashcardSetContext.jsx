import React, { createContext, useContext, useEffect, useState } from "react";

const FlashcardSetContext = createContext({});

export const useFlashcardSetContext = () => useContext(FlashcardSetContext);

export const FlashcardSetProvider = ({ children }) => {
  const [flashcardSet, setFlashcardSet] = useState({});

  const [vote, setVote] = useState({
    voted: flashcardSet?.voted,
    votePoint: flashcardSet?.votePoint,
    numberVote: flashcardSet?.numberVote,
  });

  const [isBookMarked, setIsBookMarked] = useState(flashcardSet?.isBookMarked);

  const updateVote = (newVote) => {
    setVote(newVote);
    console.log(newVote);
  };

  useEffect(() => {
    setIsBookMarked(flashcardSet?.isBookMarked);
    setVote({
      voted: flashcardSet?.voted,
      votePoint: flashcardSet?.votePoint,
      numberVote: flashcardSet?.numberVote,
    });
  }, [flashcardSet]);

  return (
    <FlashcardSetContext.Provider
      value={{
        flashcardSet,
        vote,
        isBookMarked,
        setFlashcardSet,
        updateVote,
        setIsBookMarked,
      }}
    >
      {children}
    </FlashcardSetContext.Provider>
  );
};

export default FlashcardSetContext;
