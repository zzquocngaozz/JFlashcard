export const parseVocaExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    return {
      term: row["Thuật ngữ"].trim(),
      mean: row["Ý nghĩa"].trim(),
      example: row["Ví dụ"].trim(),
      exampleMean: row["Nghĩa"].trim(),
      imgUrl: row["Link ảnh"].trim(),
    };
  });
  return jsonMapped;
};
export const parseGrammaExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    console.log(row);
    return {
      term: row["Thuật ngữ"].trim(),
      mean: row["Ý nghĩa"].trim(),
      example: row["Ví dụ"].trim().trim(),
      combination: row["Cách chia"].trim(),
      note: row["Cách dùng/Lưu ý"].trim(),
      exampleMean: row["Nghĩa"].trim(),
      imgUrl: row["Link ảnh"].trim(),
    };
  });
  return jsonMapped;
};
export const parseKanjiExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    return {
      term: row["Thuật ngữ"].trim(),
      chineseSound: row["Nghĩa Hán - Việt"].trim(),
      mean: row["Ý nghĩa"].trim(),
      onSound: row["Âm on"].trim(),
      kunSound: row["Âm kun"].trim(),
      trick: row["Mẹo nhớ"].trim(),
      example: row["Ví dụ"].trim(),
      exampleMean: row["Nghĩa"].trim(),
      imgUrl: row["Link ảnh"].trim(),
    };
  });
  return jsonMapped;
};
