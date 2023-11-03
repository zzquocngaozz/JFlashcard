import React, { useEffect } from "react";
import { FlashcardSetProvider } from "../context/FlashcardSetContext";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";

const FlashcardSetComsumer = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const match = useMatch("/:setId");
  useEffect(() => {
    console.log(match);
    if (match) navigate(`/${setId}/read`);
  });
  return (
    <FlashcardSetProvider>
      <Outlet />
    </FlashcardSetProvider>
  );
};

export default FlashcardSetComsumer;
