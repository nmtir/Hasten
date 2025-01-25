'use client';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { useThemeStore } from 'store';
import { themes } from 'config/thems';

const TopBrowserChart = ({ height = 345 }) => {
  const { theme: config } = useThemeStore();
  const theme = themes.find((theme) => theme.name === config);

  const series = [1243, 800, 400, 607, 315, 640];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ['Chrome', 'Edge', 'Safari', 'Firefox', 'Opera', 'Android Webview'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    stroke: {
      width: 0,
    },
    colors: [
      `hsl(${theme?.cssVars['light'].primary})`,
      '#3B82F6',
      '#EF4444',
      '#F97400',
      '#FACC15',
      '#F97316',
    ],
    tooltip: {
      theme: 'light',
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
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

export default TopBrowserChart;
