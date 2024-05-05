import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { FoodIntakeHistory } from '@/components/dashboard/overview/food-intake-history';
import { TwoWeekVitaminGoals } from '@/components/dashboard/overview/two-week-vitamin-goals';
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
        <TwoWeekVitaminGoals
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={6} xs={12}>
        <VitaminRefTable />
      </Grid>
      <Grid lg={6} xs={12}>
        <FoodIntakeHistory
          /* sx={{ height: '100%' }} */
        />
      </Grid>
    </Grid>
  );
}
