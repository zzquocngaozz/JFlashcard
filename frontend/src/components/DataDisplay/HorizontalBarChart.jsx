import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const HorizontalBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    // Tạo một biểu đồ thanh ngang
    const chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: [
          "Data Point 1",
          "Data Point 2",
          "Data Point 3",
          "Data Point 4",
          "Data Point 5",
        ],
        datasets: [
          {
            label: "Sample Data",
            data: [10, 20, 15, 30, 25],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Custom X-Axis in Chart.js Horizontal Bar Chart",
          },
        },
      },
    });

    // Vẽ thanh dọc cho ngày bắt đầu
    const startDate = new Date("2023-10-29");
    const startDateX = chart.scales.x.getPixelForValue(startDate);
    chart.ctx.fillRect(startDateX - 1, 0, 2, canvas.height);

    // Vẽ thanh dọc cho ngày kết thúc
    const endDate = new Date("2023-11-02");
    const endDateX = chart.scales.x.getPixelForValue(endDate);
    chart.ctx.fillRect(endDateX - 1, 0, 2, canvas.height);

    // Vẽ thanh dọc cho ngày hiện tại
    const currentDate = new Date();
    const currentDateX = chart.scales.x.getPixelForValue(currentDate);
    chart.ctx.fillRect(currentDateX - 1, 0, 2, canvas.height);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default HorizontalBarChart;
