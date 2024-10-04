import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ExpenseProfit = () => {
  const labelColor = "#FFFFFF"; // Default label color
  const gridColor = "#e7e7e7"; // Grid color
  const incomeColor = "#28a745"; // Greenish line color for income
  const expenseColor = "#dc3545"; // Reddish line color for expense

  // Define the state for series and options using useState
  const [series, setSeries] = useState([
    {
      name: "Income",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Expense",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000000", // Shadow color
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Disable toolbar
      },
    },
    colors: [incomeColor, expenseColor], // Set income to greenish and expense to reddish
    dataLabels: {
      enabled: false, // Disable data labels on the lines
    },
    stroke: {
      curve: "smooth", // Smooth curves for the lines
    },
    title: {
      text: "Income & Expense", // Title text
      align: "center",
      style: {
        color: labelColor, // Title text color
        fontSize: "18px", // Title font size
      },
    },
    grid: {
      borderColor: gridColor, // Grid border color
      row: {
        opacity: 0.1,
      },
    },
    markers: {
      size: 3, // Marker size on the line
      colors: ["green", "#FF0000"], // Custom marker colors for data points
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: {
        text: "Month",
        style: {
          color: labelColor, // X-axis title color
        },
      },
      labels: {
        style: {
          colors: labelColor, // X-axis label color
        },
      },
      axisBorder: {
        color: labelColor, // X-axis border color
      },
      axisTicks: {
        color: labelColor, // X-axis tick color
      },
    },
    yaxis: {
      title: {
        text: "Volume",
        style: {
          color: labelColor, // Y-axis title color
        },
      },
      min: 5,
      max: 40,
      labels: {
        style: {
          colors: labelColor, // Y-axis label color
        },
      },
      axisBorder: {
        color: labelColor, // Y-axis border color
      },
      axisTicks: {
        color: labelColor, // Y-axis tick color
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
      labels: {
        colors: labelColor, // Legend label colors
      },
    },
    tooltip: {
      theme: "dark", // Tooltip theme (dark or light)
      style: {
        fontSize: "12px",
        color: "#FFFFFF", // Tooltip text color
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ExpenseProfit;
