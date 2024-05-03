import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { AdviseeManagement } from '@/components/dashboard/advisee-management/advisee-management-component';
export const metadata = { title: `Advisee Management | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h4" color={'#fa8805'} align='center'>Advisee Management</Typography>
        </div>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid lg={8} md={6} xs={12}>
            <AdviseeManagement></AdviseeManagement>
          </Grid>
        </Grid>
      </Stack>
    );
  }