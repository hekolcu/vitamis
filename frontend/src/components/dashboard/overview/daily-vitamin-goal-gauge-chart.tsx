'use client';

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { VitaminGaugeChart } from '@/components/dashboard/overview/vitamin-gauge-chart';
import { Box } from '@mui/material';
import { getTrackingDaily } from '@/lib/auth/auth-utils';

export default function DailyVitaminGoalCompletion(): React.JSX.Element {
  const [vitaminValues, setVitaminValues] = React.useState<Array<{name: string, value: number}>>([]);

  React.useEffect(() => {
    const fetchVitamins = async () => {
      const result = await getTrackingDaily(localStorage.getItem('custom-auth-token') as string);
      console.log(result);
      if (result === null || typeof result === 'string') {
        console.error(result);
        console.log('Error fetching daily vitamins');
        return;
      }
      const vitamins = result.map((vitamin: {vitaminName: string, consumedAmount: number, recommendedAmount: string, percentage: number}) => {
        return { name: vitamin.vitaminName, value: vitamin.percentage.toFixed(2) };
      });
      setVitaminValues(vitamins);
    };

    fetchVitamins();
  }, []);

  return (
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
  );
}
