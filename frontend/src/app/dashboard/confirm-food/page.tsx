import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { ConfirmFoodForm } from '@/components/dashboard/confirm-food/confirm-food-form';

export const metadata = { title: `Confirm Food | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

  return (
    <Stack width={'100%'} spacing={3}>
      <div>
        <Typography variant="h4" color={'#fa8805'} align='center'>Confirm Food</Typography>
      </div>
      <ConfirmFoodForm />
    </Stack>
  );
}