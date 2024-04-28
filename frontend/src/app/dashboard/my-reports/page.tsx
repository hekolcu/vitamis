import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { ViewReport } from '@/components/dashboard/my-reports/my-reports-component';

export const metadata = { title: `My Reports | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h4" color={'#fa8805'} align='center'>My Reports</Typography>
        </div>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid lg={8} md={6} xs={12}>
            <ViewReport></ViewReport>
          </Grid>
        </Grid>
      </Stack>
    );
  }