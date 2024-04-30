'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


export function UpdatePasswordForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        {/* <CardContent>
          <Stack spacing={2} >
            <FormControl fullWidth >
              <InputLabel>Password</InputLabel>
              <OutlinedInput label="Password" name="password" type="password" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Confirm password</InputLabel>
              <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
            </FormControl>
          </Stack>
        </CardContent> */}
        <CardContent>
          <Grid container rowSpacing={3}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel>Password</InputLabel>
                <OutlinedInput label="Password" name="password" type="password" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant="contained" color="warning">Update</Button>
        </CardActions>
      </Card>
    </form >
  );
}
