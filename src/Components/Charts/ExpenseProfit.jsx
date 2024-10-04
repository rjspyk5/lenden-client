import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ExpenseProfit = () => {
  const labelColor = "white";
  // Define the state for series and options using useState
  const [series, setSeries] = useState([
    {
      name: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Average High & Low Temperature",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        opacity: 0.1,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: {
        text: "Month",
      },
      color: "white",
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
      title: {
        text: "Volume",
      },
      min: 5,
      max: 40,
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
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ExpenseProfit;
