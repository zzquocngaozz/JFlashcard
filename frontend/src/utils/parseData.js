import { isEmpty } from "./manualTesting";

export const parseVocaExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    return {
      term: row["Thuật ngữ"]?.trim(),
      mean: row["Ý nghĩa"]?.trim(),
      example: row["Ví dụ"]?.trim(),
      exampleMean: row["Nghĩa"]?.trim(),
      imgUrl: row["Link ảnh"]?.trim(),
    };
  });
  return jsonMapped;
};
export const parseGrammaExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    return {
      term: row["Thuật ngữ"]?.trim(),
      mean: row["Ý nghĩa"]?.trim(),
      example: row["Ví dụ"]?.trim(),
      combination: row["Cách chia"]?.trim(),
      note: row["Cách dùng/Lưu ý"]?.trim(),
      exampleMean: row["Nghĩa"]?.trim(),
      imgUrl: row["Link ảnh"]?.trim(),
    };
  });
  return jsonMapped;
};
export const parseKanjiExcel = (jsonExecel) => {
  const jsonMapped = jsonExecel.map((row) => {
    return {
      term: row["Thuật ngữ"]?.trim(),
      chineseSound: row["Nghĩa Hán - Việt"]?.trim(),
      mean: row["Ý nghĩa"]?.trim(),
      onSound: row["Âm on"]?.trim(),
      kunSound: row["Âm kun"]?.trim(),
      trick: row["Mẹo nhớ"]?.trim(),
      example: row["Ví dụ"]?.trim(),
      exampleMean: row["Nghĩa"]?.trim(),
      imgUrl: row["Link ảnh"]?.trim(),
    };
  });
  return jsonMapped;
};

export const countValues = (...a) => {
  return a.reduce((total, a) => {
    return (total += a);
  }, 0);
};
// parseChart data
export const getOptionChart = (title, timeProgressLabels, annotations) => ({
  indexAxis: "y",
  layout: {
    padding: {
      right: 40,
    },
  },
  onHover: (ctx, bar) => {
    if (isEmpty(bar)) ctx.chart.canvas.style.cursor = "default";
    if (!isEmpty(bar)) ctx.chart.canvas.style.cursor = "pointer";
  },
  scales: {
    x: {
      beginAtZero: true, // Bắt đầu trục x từ 0
      position: "bottom",
      type: "linear",
      max: 100, // Đặt giá trị tối đa cho trục x
      ticks: {
        reverse: false,
        stepSize: 25,
        callback(value) {
          return `${value} %`;
        },
      },
      title: {
        display: true,
        text: "Tiến độ",
      },
    },
    x1: {
      position: "top",
      type: "category",
      labels: timeProgressLabels,
      title: {
        display: true,
        text: "Thời gian làm",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
    },
    title: {
      display: true,
      text: title,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          let data = context.dataset.data || "";
          if (label) {
            label += ": ";
          }
          if (data) {
            label += data[context.dataIndex] + "%";
          }
          return label;
        },
      },
    },
    annotation: {
      enter: function enter({ chart, element }) {
        chart.canvas.style.cursor = "pointer";
      },

      leave: function leave({ chart, element }) {
        chart.canvas.style.cursor = "default";
      },
      clip: false,
      common: {
        drawTime: "afterDraw",
      },
      annotations: annotations,
    },
    datalabels: {
      formatter: function (value) {
        return value > 10 ? value + " %" : "";
      },
      anchor: "end",
      color: "rgba(255,255,255 ,0.8)",
      align: -2,
      offset: -40,
      display: "auto",
    },
  },
});

export const getData = (labels, dataSets) => {
  return {
    labels,
    datasets: [
      {
        label: "Tiến độ",
        barPercentage: 0.6,
        xAxisID: "x",
        ...dataSets,
      },
    ],
  };
};

/**
 *
 *@param type 1 is red flag, another is expect
 */
export const getAnnotationLine = (value, currentDate = "", type) => ({
  type: "line",
  scaleID: "x",
  borderDash: [6, 6],
  value: value,
  borderColor: type === 1 ? "#FF5B22" : "#4F6F52",
  borderWidth: 2,
  order: 1,

  // TODO: chuyen thanh variable
  label: {
    content: [
      type === 1 ? "Red flag" : "Tiến độ dự kiến",
      currentDate,
      value + " %",
    ],
    display: false,
    position: type === 1 ? "end" : "start",
    borderWidth: 1,
    z: 2,
  },
  enter({ chart, element }, event) {
    element.label.options.display = true;
    chart.canvas.style.cursor = "pointer";
    return true;
  },
  leave({ chart, element }, event) {
    element.label.options.display = false;
    chart.canvas.style.cursor = "default";
    return true;
  },
});

export const getProgess = (numberLearned, numberCards) => {
  return Math.round((numberLearned / numberCards) * 100, 2);
};

export const getStatus = function (expect, numberCards) {
  if (numberCards < expect / 2) return 0; // redflag
  if (numberCards >= expect) return 2; // goodjob
  return 1; // warn
};
/**
 * @returns point expect achive base on start, due and current date
 */
export const getExpectLearn = (start, due) => {
  const current = new Date().getTime();
  const startTime = new Date(start).getTime();
  const dueTime = new Date(due).getTime();

  return dueTime < current
    ? 100
    : Math.round(((current - startTime) / (dueTime - startTime)) * 100, 2);
};

export const getBarColor = function (statusFlag = 0 | 1 | 2) {
  return {
    0: "#950101", // redflag
    1: "#F4CE14", // warn
    2: "#1A5D1A", // good job
  }[statusFlag];
};

export function customFormatDate(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${hours}h ${day}/${month}`;
}

export function splitTimeRange(startDate, endDate) {
  const dateArray = [];
  const totalHours = (endDate - startDate) / (1000 * 60 * 60); // Tổng số giờ giữa startDate và endDate
  // Số khoảng thời gian bạn muốn tạo (5 trong ví dụ này)
  const numberOfRanges = 4;
  // Tính toán số giờ cho mỗi khoảng thời gian
  const interval = totalHours / numberOfRanges;

  for (let i = 0; i < numberOfRanges; i++) {
    const newDate = new Date(
      startDate.getTime() + i * interval * 60 * 60 * 1000
    );

    dateArray.push(newDate);
  }
  dateArray.push(endDate);

  return dateArray.map((date) => {
    if (interval % 24 !== 0) return customFormatDate(date);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  });
}
