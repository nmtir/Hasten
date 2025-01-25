'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useThemeStore } from 'store';
import { themes } from 'config/thems';

const StatsChart = ({ height = 305 }) => {
  const { theme: config } = useThemeStore();
  const theme = themes.find((theme) => theme.name === config);

  const series = [900, 800, 400];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ['Man', 'Woman', 'Others'],
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    stroke: {
      width: 0,
    },
    colors: ['#826AF9', '#22C55E', '#FACC15'],
    tooltip: {
      theme: 'light',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            style: {
              fontSize: '12px',
              fontWeight: 500,
              color: `hsl(${theme?.cssVars['light'].chartLabel})`,
            },
            value: {
              color: `hsl(${theme?.cssVars['light'].chartLabel})`,
            },
            total: {
              show: true,
              color: `hsl(${theme?.cssVars['light'].chartLabel})`,
            },
          },
        },
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: `hsl(${theme?.cssVars['light'].chartLabel})`,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: -5,
      },
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
      width={'100%'}
    />
  );
};

export default StatsChart;
