import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { Notifications } from '@/components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import Grid from '@mui/material/Unstable_Grid2';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4" color={'#fa8805'} align='center'>Settings</Typography>
      </div>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
        {/* <Notifications /> */}
        <Grid md={6} xs={8}>
          <UpdatePasswordForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
