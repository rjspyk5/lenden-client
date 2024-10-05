import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TransitionChart = () => {
  // Hardcoded fake price data and dates
  const textColor = "white";
  const labelColor = "white";
  const gridColor = "transparent";
  const fakeData = {
    prices: [
      50, 55, 60, 58, 65, 70, 72, 68, 75, 80, 78, 82, 85, 87, 90, 92, 95, 97,
      100, 98, 105, 110, 108, 112, 115, 120, 125, 130, 128, 135,
    ],
    dates: [
      "2023-09-01",
      "2023-09-02",
      "2023-09-03",
      "2023-09-04",
      "2023-09-05",
      "2023-09-06",
      "2023-09-07",
      "2023-09-08",
      "2023-09-09",
      "2023-09-10",
      "2023-09-11",
      "2023-09-12",
      "2023-09-13",
      "2023-09-14",
      "2023-09-15",
      "2023-09-16",
      "2023-09-17",
      "2023-09-18",
      "2023-09-19",
      "2023-09-20",
      "2023-09-21",
      "2023-09-22",
      "2023-09-23",
      "2023-09-24",
      "2023-09-25",
      "2023-09-26",
      "2023-09-27",
      "2023-09-28",
      "2023-09-29",
      "2023-09-30",
    ],
  };

  // Initialize state using useState hook
  const [series, setSeries] = useState([
    {
      name: "Transition",
      data: fakeData.prices,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 300,
      background: "#f4f4f",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#02d414"], // Line/area color
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#02d414"],
    },
    title: {
      text: "All Transition",
      align: "center",
      style: {
        color: textColor,
        fontSize: "15px",
      },
    },
    subtitle: {
      text: "Volume",
      align: "left",
      style: {
        color: "white", // Subtitle color
        fontSize: "12px", // Subtitle font size
      },
    },
    labels: fakeData.dates,
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: labelColor,
        },
      },
      axisBorder: {
        color: labelColor,
      },
      axisTicks: {
        color: labelColor,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
        },
      },
      axisBorder: {
        color: labelColor,
      },
      axisTicks: {
        color: labelColor,
      },
    },
    grid: {
      borderColor: gridColor,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.8,
        gradientToColors: ["#87CEEB"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.3,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#000000", // Legend text color
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        color: "#ffffff",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={314}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TransitionChart;
