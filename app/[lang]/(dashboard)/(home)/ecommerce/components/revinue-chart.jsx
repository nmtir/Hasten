"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "store";
import { themes } from "config/thems";
import { getGridConfig, getYAxisConfig } from "lib/appex-chart-options";

const RevinueChart = ({ height = 350 }) => {
  const { theme: config, isRtl } = useThemeStore();
  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Net Profit",
      data: [44, 55, 41, 37, 22, 43, 21, 40, 30, 50, 60, 50],
    },
    {
      name: "Orders",
      data: [53, 32, 33, 52, 13, 43, 32, 40, 50, 20, 40, 50],
    },
    {
      name: "Return",
      data: [40, 47, 51, 39, 35, 51, 60, 40, 60, 30, 20, 60],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: "20%",
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            style: {
              colors: [
                `hsl(${theme?.cssVars["light"]
                  .chartLabel
                })`,
              ],
              fontSize: "13px",
              fontWeight: 800,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        `hsl(${theme?.cssVars["light"]
          .chartLabel
        })`,
      ],
    },
    colors: [
      `hsl(${theme?.cssVars["light"].primary})`,
      `hsl(${theme?.cssVars["light"].info})`,
      `hsl(${theme?.cssVars["light"].warning})`,
    ],
    tooltip: {
      theme: "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars["light"].chartGird})`
    ),
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars["light"].chartLabel})`
    ),
    xaxis: {
      boards: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: `hsl(${theme?.cssVars["light"]
            .chartLabel
          })`,
          fontSize: "12px",
        },
      },
    },

    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: `hsl(${theme?.cssVars["light"]
          .chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5
      }
    }
  };
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default RevinueChart;
