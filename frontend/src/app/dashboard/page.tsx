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
  const vitaminValues = [
    { name: 'Vitamin A', value: 15 },
    { name: 'Vitamin B6', value: 75 },
    { name: 'Vitamin E', value: 55 },
    { name: 'Vitamin K', value: 85 },
    { name: 'Vitamin B12', value: 95 },
    { name: 'Vitamin C', value: 25 },
    { name: 'Vitamin D', value: 100 },
    { name: 'Vitamin B', value: 75 },
  ];
  return (
    <Grid container spacing={3}>
      <Typography variant="h6" sx={{ mb: 3 }}>Daily Intake</Typography>
      {/* Wrap the Gauge Chart components in a Box for horizontal scrolling */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          overflowY: 'hidden', // Prevent vertical scrolling
          width: '100%',
          mb: 3,
          p: 0,
          '& > div': {
            flex: '0 0 auto', // Prevent flex items from growing or shrinking
            padding: 0, // Add padding to each item
            // width: 'calc(20% - 16px)', // 20% of the container width minus grid spacing
          },
          '-webkit-overflow-scrolling': 'touch', // Smooth scrolling on iOS devices
          scrollbarWidth: 'none',  // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none',  // Hide scrollbar for Chrome, Safari and Opera
          },
        }}
      >
        {vitaminValues.map((value, index) => (
          <Grid key={index} xs={6} sm={4} lg={3} sx={{ padding: 0, margin: -3 }}>
            <VitaminGaugeChart name={value.name} series={value.value} />
          </Grid>
        ))}
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