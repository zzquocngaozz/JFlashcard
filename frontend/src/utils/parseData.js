export const parseVocaExcel = (jsonExecel)=>{
    const jsonMapped = jsonExecel.map(row => {
        return {
          'term': row['Thuật ngữ'],
          'mean': row['Ý nghĩa'],
          'example': row['Ví dụ'],
          'exampleMean': row['Nghĩa'],
          'imgUrl': row['Link ảnh'],
        };
      });
      return jsonMapped
}
export const parseGrammaExcel = (jsonExecel)=>{
    const jsonMapped = jsonExecel.map(row => {
        return {
          'term': row['Thuật ngữ'],
          'mean': row['Ý nghĩa'],
          'example': row['Ví dụ'],
          'combination': row['Cách chia'],
          'note': row['Cách dùng/Lưu ý'],
          'exampleMean': row['Nghĩa'],
          'imgUrl': row['Link ảnh'],
        };
      });
      return jsonMapped
}
export const parseKanjiExcel = (jsonExecel)=>{
    const jsonMapped = jsonExecel.map(row => {
        return {
          'term': row['Thuật ngữ'],
          'chineseSound': row['Nghĩa Hán - Việt'],
          'mean': row['Ý nghĩa'],
          'onSound': row['Âm on'],
          'kunSound': row['Âm kun'],
          'trick': row['Mẹo nhớ'],
          'example': row['Ví dụ'],
          'exampleMean': row['Nghĩa'],
          'imgUrl': row['Link ảnh'],
        };
      });
      return jsonMapped
}