"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "store";
import { themes } from "config/thems";

const UserStats = ({ height = 250 }) => {
  const { theme: config, isRtl } = useThemeStore();
  const theme = themes.find((theme) => theme.name === config);
  const series = [1200, 1400];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Old User", "New User"],
    dataLabels: {
      enabled: false,
    },
    colors: [
      `hsl(${theme?.cssVars["light"].primary})`,
      `hsl(${theme?.cssVars["light"].info})`,
    ],
    tooltip: {
      theme: "light",
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              colors: `hsl(${theme?.cssVars["light"]
                .chartLabel
              })`,
            },
            value: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars["light"]
                .chartLabel
              })`,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars["light"]
                .chartLabel
              })`,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: `hsl(${theme?.cssVars[
          "light"
          ].chartLabel
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
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default UserStats;
