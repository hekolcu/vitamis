import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import { config } from '@/config';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import VitaminRefTable from '@/components/dashboard/overview/vitamin-ref-table';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { VitaminGaugeChart } from '@/components/dashboard/overview/vitamin-gauge-chart';
import { Box, Typography } from '@mui/material';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

  return (
    <Grid container spacing={3}>
      <Typography variant="h6" sx={{ mb: 3 }}>Daily Intake</Typography>

      {/* Wrap the Gauge Chart components in a Box for horizontal scrolling */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          width: '100%',
          mb: 3,
          '& > div': {
            flex: '0 0 auto', // Prevent flex items from growing or shrinking
            width: 'calc(20% - 16px)', // 20% of the container width minus grid spacing
          },
          '-webkit-overflow-scrolling': 'touch', // Smooth scrolling on iOS devices
          scrollbarWidth: 'none',  // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none',  // Hide scrollbar for Chrome, Safari and Opera
          },
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid key={index} xs={12} lg={3}>
            <VitaminGaugeChart />
          </Grid>
        ))}
        {/* <Grid lg={3} sm={6} xs={12}>
          <VitaminGaugeChart />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <VitaminGaugeChart />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <VitaminGaugeChart />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <VitaminGaugeChart />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <VitaminGaugeChart />
        </Grid> */}
      </Box>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[16, 22, 62]} labels={['Vegetable', 'Fruit', 'Meal']} sx={{ height: '100%' }} />
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