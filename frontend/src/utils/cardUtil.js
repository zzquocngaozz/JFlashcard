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
