import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AddFoodForm } from '@/components/dashboard/add-food/add-food-form';



export const metadata = { title: `Yiyecek Ekle | Gösterge Paneli | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack width={'100%'} spacing={3}>
      <div>
        <Typography variant="h4" color={'#fa8805'} align='center'>Yemek Ekle</Typography>
      </div>
      <AddFoodForm />
    </Stack>
  );
}