import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const learnProgress = {
  flashcardSetId: 1,
  title: "Kanji bộ thuỷ",
  startDate: new Date("2023-10-31").getTime(), // ngày bộ thẻ đuoc gan vao lop học
  dueDate: new Date("2023-11-07").getTime(),
  numberCards: 60,
  data: [
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
    {
      userId: 1,
      userName: "hieuht01",
      email: "hieuht01@gmail.com",
      numberLearned: 20,
    },
    {
      userId: 2,
      userName: "huudd01",
      email: "huudd01@gmail.com",
      numberLearned: 30,
    },
  ],
};

const data = {
  labels: ["Cần nhắc nhở", "Cần lưu ý", "Đang làm tốt"],
  datasets: [
    {
      label: "Số lượng",
      data: [3, 5, 12],
      backgroundColor: ["#950101", "#F4CE14", "#1A5D1A"],
    },
  ],
};

const OverallLearnProgress = ({ learnProgress: parsedData }) => {
  const chartOptions = {
    tooltips: {
      enabled: false,
    },
    layout: {
      padding: 10,
    },
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          console.log("183 ", context.dataIndex);
          return value + " người";
        },
        color: "#FFF",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 4,
        padding: 5,
        anchor: "center",
        listeners: {
          enter: function (context) {
            context.chart.canvas.style.cursor = "pointer";
          },
          leave: function (context) {
            context.chart.canvas.style.cursor = "default";
          },
          click: function (context) {
            console.log("click", context.dataIndex);
          },
        },
      },
      tooltip: {
        enabled: false,
        // callbacks: {
        //   label: function (context) {
        //     let label = context.dataset.label || "";
        //     let data = context.dataset.data || "";
        //     if (label) {
        //       label += ": ";
        //     }
        //     if (data) {
        //       label += data[context.dataIndex] + " học sinh";
        //     }
        //     return label;
        //   },
        // },
      },
    },
  };
  return <Doughnut data={data} options={chartOptions} />;
};

export default OverallLearnProgress;
