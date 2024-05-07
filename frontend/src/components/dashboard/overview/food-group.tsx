'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Carrot as CarrotIcon } from '@phosphor-icons/react/dist/ssr/Carrot';
import { OrangeSlice as OrangeSliceIcon } from '@phosphor-icons/react/dist/ssr/OrangeSlice';
import { CookingPot as CookingPotIcon } from '@phosphor-icons/react/dist/ssr/CookingPot';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '@/components/core/chart';
import { useEffect, useState } from 'react';
import { AlignCenterHorizontal } from '@phosphor-icons/react';
import { Box } from '@mui/material';

const iconMapping = { Sebze: CarrotIcon, Meyve: OrangeSliceIcon, 'Diğer': CookingPotIcon } as Record<string, Icon>;

export interface TrafficProps {
  sx?: SxProps;
}

export function FoodGroup({ sx }: TrafficProps): React.JSX.Element {
  const [chartData, setChartData] = useState<{ [key: string]: number }>({});
  const labels = Object.keys(chartData);
  const chartSeries = Object.values(chartData);
  const chartOptions = useChartOptions(labels);

  useEffect(() => {
    const token = localStorage.getItem('custom-auth-token');
    fetch('https://api.vitamis.hekolcu.com/tracking/dailyFoodGroups', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setChartData(data))
      .catch(error => console.error(error));
  }, []);

  const total = chartSeries.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return (
      <Card sx={sx}>
        <CardHeader title="Günlük Vitamin Alımı" />
        <CardContent sx={{ alignContent: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h6" align="center">
              Günlük Veri mevcut değil
            </Typography>
            <Chart
              height={300}
              options={{ ...chartOptions, colors: ['#E4E4E3'], labels: ['No data'] }}
              series={[100]}
              type="donut"
              width="100%"
            />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Günlük Vitamin Alımı" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item.toFixed(2)}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
