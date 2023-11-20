export const isKanjiCard = (card) => {
  return Object.keys(card).includes("chineseSound");
};

export const isVocaCard = (card) => {
  const keys = Object.keys(card);
  return !(keys.includes("chineseSound") || keys.includes("note"));
};

export const isGrammarCard = (card) => {
  return Object.keys(card).includes("note");
};

export const isImportKanji = (card) => {
  return Object.keys(card).includes("Nghĩa Hán - Việt");
};

export const isImportVoca = (card) => {
  const keys = Object.keys(card);
  return !(keys.includes("Nghĩa Hán - Việt") || keys.includes("Cách chia"));
};

export const isImportGrammar = (card) => {
  return Object.keys(card).includes("Cách chia");
};

export const getCardType = (card) =>
  isKanjiCard(card) ? 1 : isGrammarCard(card) ? 3 : 2;

export const sortDesCreateTime = (listCard) => {
  return listCard.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt));
};
