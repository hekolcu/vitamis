import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { AddMealForm } from '@/components/dashboard/add-meal/add-meal-from';

export const metadata = { title: `Öğün Ekle | Gösterge Paneli | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h4" color={'#fa8805'} align='center'>Öğün Ekle</Typography>
        </div>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid lg={8} md={6} xs={12}>
            <AddMealForm />
          </Grid>
        </Grid>
      </Stack>
    );
  }