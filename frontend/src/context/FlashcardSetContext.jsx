import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { isEmpty } from "../utils/manualTesting";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "react-hook-form";

const FlashcardSetContext = createContext({});

export const useInitFlashcardSetContext = () => {
  const context = useContext(FlashcardSetContext);
  const { setId } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (context.loadedSet !== setId) {
      console.log("useFlashcardSetContext change ?");
      setLoading(true);
      setTimeout(() => {
        context.setFlashcardSet({
          flashcardSetId: 7,
          title: "Từ vựng minna",
          description:
            "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
          numberVote: 27,
          votePoint: 4.5,
          numberCard: 60,
          voted: 0,
          isBookMarked: true,
          createdAt: "2023/10/10",
          type: 2,
          private: false,
          authoDTO: {
            userId: 1,
            userName: "ducpa01",
            role: 1,
          },
          cards: [
            {
              cardId: 20,
              onSound: "ソク",
              kunSound: "あし",
              chineseSound: "Túc",
              term: "足",
              mean: "Đầy đủ, chân",
              example: "犬が彼女の足にかみついた",
              exampleMean: "Một con chó đã cắn vào chân cô ấy",
              imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
              trick: "Chân(足) không đủ(不足) dài để thi chạy",
              flashcardSetId: 1,
            },
            {
              cardId: 13,
              term: "冷えう",
              mean: "Đầy đủ, chân",
              example:
                "ウェルカムパーティーはさくら公において行(おこな)われる予定です",
              exampleMean:
                "Bữa tiệc chào mừng dự kiến sẽ được tổ chứcở công viên sakura",
              imgUrl:
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format",
              flashcardSetId: 1,
            },
            {
              cardId: 14,
              combination: "Ｖ-タ形 ／Ｎの＋上で",
              note: "N ở đây là danh động từ",
              term: "A~上(で)B",
              mean: "Sau khi làm A thì làm B",
              example:
                "電話または協会窓口でお申し込みの上、当日参加費をお支払いください",
              exampleMean:
                "Sau khi đăng ký bằng điện thoại hoặc quầy lễ tân, hãy thanh toán phí tham gia của ngày hôm đó",
              imgUrl:
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format",
              flashcardSetId: 8,
            },
            {
              cardId: 4,
              onSound: "がぞう",
              kunSound: "がぞう",
              chineseSound: "がぞう",
              term: "戻り値",
              mean: "Giá trị trả về",
              example: "参照アクセス",
              exampleMean: "khoá ngoại ",
              imgUrl: "https://www.sk-access.com/syo_table/na007_01.jpg",
              trick: "がぞう",
              flashcardSetId: 1,
            },
          ],
          learnedCards: [
            {
              trackingProgressId: 1,
              cardId: 4,
              userId: 7,
              flashcardSetId: 1,
              createdAt: 32154013,
              lastLearn: 12312311,
            },
          ],
          markedCards: [
            // {
            //   bookMarkCardId: 1,
            //   userId: 4,
            //   flashcardSetId: 1,
            //   cardId: 4,
            // },
          ],
        });
        setLoading(false);
      }, 1000);
      context.setLoadedSet(setId);
    }
    if (context.loadedSet === setId) setLoading(false);
  }, [setId]);

  return { loading, ...context };
};

export const useFlashcardSetContext = () => useContext(FlashcardSetContext);

export const FlashcardSetProvider = ({ children }) => {
  const [flashcardSet, setFlashcardSet] = useState({});

  const [cards, setCards] = useState([]);
  const [remain, setRemain] = useState([]);
  const [learnedCards, setLearnedCards] = useState([]);
  const [markedCards, setMarkedCards] = useState([]);
  const [vote, setVote] = useState({});
  const [isBookMarked, setIsBookMarked] = useState();
  const [mutation, setMutation] = useState(false);
  const [loadedSet, setLoadedSet] = useState("-1");

  const updateVote = (newVote) => {
    setMutation(true);
    setVote({ ...vote, ...newVote });
    setTimeout(() => {
      setMutation(false);
    }, [1000]);
  };
  const { isLogin } = useAuth();

  const handleToggleSelectCard = (cardId) => {
    const selected = cards?.find((card) => card?.cardId === cardId);

    if (!markedCards?.includes(selected)) {
      const cache = [...markedCards, selected];
      cache.sort((a, b) => a?.cardId - b?.cardId);

      setMarkedCards(cache);
    } else {
      const cache = markedCards?.filter((card) => card?.cardId !== cardId);
      setMarkedCards(cache);
    }
  };

  const logStudiedCard = (studied) => {
    console.log(studied);
    setMutation(true);
    const learnedSet = new Set(learnedCards?.map((card) => card?.cardId));
    if (!learnedSet.has(studied.cardId)) {
      const cache = [...learnedCards, studied];
      setLearnedCards(cache);
      const cacheRemain = remain.filter(
        (cardRemaim) => cardRemaim.cardId !== studied.cardId
      );
      setRemain(cacheRemain);
    }
    setTimeout(() => {
      setMutation(false);
    }, [1000]);
  };

  useEffect(() => {}, [markedCards]);

  const handleToggleBookMarked = (data) => {
    setMutation(true);
    setIsBookMarked(data);
    setTimeout(() => {
      setMutation(false);
    }, [1000]);
  };

  useEffect(() => {
    //parse data
    setMutation(true);
    setFlashcardSet(flashcardSet);

    setIsBookMarked(flashcardSet?.isBookMarked);
    setVote({
      voted: flashcardSet?.voted,
      votePoint: flashcardSet?.votePoint,
      numberVote: flashcardSet?.numberVote,
    });
    if (isLogin() && !isEmpty(flashcardSet)) {
      const learnedSet = new Set(
        flashcardSet?.learnedCards?.map((card) => card?.cardId)
      );
      const markedSet = new Set(
        flashcardSet?.markedCards?.map((card) => card?.cardId)
      );
      const sortedList = flashcardSet?.cards?.reduce(
        (result, card) => {
          if (learnedSet?.has(card.cardId)) result.learned.push(card);
          else result.remain.push(card);
          if (markedSet?.has(card.cardId)) result.marked.push(card);
          return result;
        },
        { learned: [], remain: [], marked: [] }
      );

      setRemain(sortedList.remain);
      setLearnedCards(sortedList.learned);
      setMarkedCards(sortedList.marked);
      setCards(flashcardSet.cards);
    }
    setMutation(false);
  }, [flashcardSet]);

  return (
    <FlashcardSetContext.Provider
      value={{
        flashcardSet,
        vote,
        isBookMarked,
        mutation,
        cards,
        remain,
        learnedCards,
        markedCards,
        loadedSet,
        logStudiedCard,
        setLoadedSet,
        setFlashcardSet,
        updateVote,
        handleToggleBookMarked,
        handleToggleSelectCard,
      }}
    >
      {children}
    </FlashcardSetContext.Provider>
  );
};

export default FlashcardSetContext;
