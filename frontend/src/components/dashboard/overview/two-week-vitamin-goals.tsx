'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface TwoWeekVitaminGoalsProps {
  sx?: SxProps;
}

export function TwoWeekVitaminGoals({ sx }: TwoWeekVitaminGoalsProps): React.JSX.Element {
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const chartOptions = useChartOptions();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('custom-auth-token') as string;
      const response = await axios.get('https://api.vitamis.hekolcu.com/tracking/twoWeeksReport', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data.map((item: any) => ({
        x: new Date(item.date).toLocaleDateString('tr-TR'),
        y: Math.ceil(item.goalAchievementPercentage)
      }));

      setChartSeries([{ name: 'Goal Achievement', data }]);
    };

    fetchData();
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader
        title="Vitamin Hedef Tamamlama Oranı"
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      {/* <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions> */}
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      labels: {
        rotate: -45, // Rotate labels to prevent overlap
        offsetY: 5,
        style: { colors: theme.palette.text.secondary }
      },
    },
    yaxis: {
      min: 0, // Minimum value
      max: 100, // Maximum value
      tickAmount: 10, // Number of tick intervals
      labels: {
        formatter: (value) => value.toString() + '%',
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
