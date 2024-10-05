import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TransitionChart = ({ graphData }) => {
  const textColor = "white";
  const labelColor = "white";
  const gridColor = "transparent";

  // Initialize state using useState hook
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 350,
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
      enabled: true,
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
      text: "Amount",
      align: "left",
      style: {
        color: "white", // Subtitle color
        fontSize: "12px", // Subtitle font size
      },
    },
    labels: [],
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM",
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
    markers: {
      size: 3, // Marker size on the line
      colors: ["green"], // Custom marker colors for data points
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

  // Effect to update chart data when graphData changes
  useEffect(() => {
    if (graphData && graphData.dates.length > 0) {
      setSeries([{ name: "Transition", data: graphData.prices }]);
      setOptions((prevOptions) => ({
        ...prevOptions,
        labels: graphData.dates, // Update the labels with actual dates
      }));
    }
  }, [graphData]);

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
