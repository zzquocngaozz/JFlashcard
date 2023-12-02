import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const getDataChart = (labels, data, backgroundColor) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Số lượng",
        data: data,
        backgroundColor: backgroundColor,
      },
    ],
  };
};

const OverallLearnProgress = ({ labelData, handleChangeFilter }) => {
  const [data, setData] = useState({
    labels: ["Cần nhắc nhở", "Cần lưu ý", "Đang làm tốt"],
    datasets: [
      {
        label: "Số lượng",
        data: [0, 0, 0],
        backgroundColor: ["#950101", "#F4CE14", "#1A5D1A"],
      },
    ],
  });

  useEffect(() => {
    const label = ["Cần nhắc nhở", "Cần lưu ý", "Làm tốt"];
    const backgroundColor = ["#950101", "#F4CE14", "#1A5D1A"];

    const parseDoughnut = labelData.reduce(
      (result, data, index) => {
        if (data === 0) return result;
        result.labels.push(label[index]);
        result.backgroundColor.push(backgroundColor[index]);
        result.data.push(data);
        return result;
      },
      { labels: [], backgroundColor: [], data: [] }
    );

    setData(getDataChart(label, labelData, backgroundColor));
  }, [labelData]);
  const handleOnclickLabel = (index) => {
    handleChangeFilter(index);
  };
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
          return value + " người";
        },
        color: "#FFF",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 4,
        padding: 5,
        anchor: "center",
        listeners: {
          enter: function (context) {
            if (context.dataset.data[context.dataIndex] === 0) return;
            context.chart.canvas.style.cursor = "pointer";
          },
          leave: function (context) {
            if (context.dataset.data[context.dataIndex] === 0) return;
            context.chart.canvas.style.cursor = "default";
          },
          click: function (context) {
            if (context.dataset.data[context.dataIndex] === 0) return;
            handleOnclickLabel(context.dataIndex);
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

export default React.memo(OverallLearnProgress);
