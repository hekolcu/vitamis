import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import VitaminRefTable from '@/components/dashboard/overview/vitamin-ref-table';
import { Typography } from '@mui/material';
import DailyVitaminGoalCompletion from '@/components/dashboard/overview/daily-vitamin-goal-gauge-chart';

export const metadata = { title: `Genel Bakış | Gösterge Paneli | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Typography variant="h6" sx={{ mb: 3, pl: 4 }}>Günlük Alım</Typography>
      {/* Wrap the Gauge Chart components in a Box for horizontal scrolling */}
      <DailyVitaminGoalCompletion />
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[16, 22, 62]} labels={['Sebze', 'Meyve', 'Yemek']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={6} xs={12}>
        <VitaminRefTable />
      </Grid>
      <Grid lg={6} xs={12}>
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
