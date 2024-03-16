'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';


// const states = [
//   { value: 'alabama', label: 'Alabama' },
//   { value: 'new-york', label: 'New York' },
//   { value: 'san-francisco', label: 'San Francisco' },
//   { value: 'los-angeles', label: 'Los Angeles' },
// ] as const;

export function AccountDetailsForm(): React.JSX.Element {

  const [formValues, setFormValues] = React.useState({
    height: '',
    weight: '',
    dob: '',
    disease: '',
    sunExposure: '',
    smoking: '',
    gender: '',
  });

  // Handle changes in form inputs
  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    // Here you would typically handle the submission e.g., send data to an API
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        {/* <Divider /> */}
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Height field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="height">Height</InputLabel>
                <OutlinedInput
                  id="height"
                  value={formValues.height}
                  onChange={handleChange('height')}
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                  label="Height"
                  type="number"
                />
              </FormControl>
            </Grid>
            {/* Weight field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="weight">Weight</InputLabel>
                <OutlinedInput
                  id="weight"
                  value={formValues.weight}
                  onChange={handleChange('weight')}
                  endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                  label="Weight"
                  type="number"
                />
              </FormControl>
            </Grid>
            {/* Date of Birth field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <TextField
                  id="dob"
                  label="Date of Birth"
                  type="date"
                  value={formValues.dob}
                  onChange={handleChange('dob')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            {/* Gender field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={formValues.gender}
                  label="Gender"
                  onChange={handleChange('gender')}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Sun exposure field */}
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sun-exposure-label">Sun Exposure</InputLabel>
                <Select
                  labelId="sun-exposure-label"
                  id="sun-exposure"
                  value={formValues.sunExposure}
                  label="Sun Exposure"
                  onChange={handleChange('sunExposure')}
                >
                  <MenuItem value={'Low'}>Low</MenuItem>
                  <MenuItem value={'Moderate'}>Moderate</MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Smoking field */}
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel id="smoking-label">Smoking</InputLabel>
                <Select
                  labelId="smoking-label"
                  id="smoking"
                  value={formValues.smoking}
                  label="Smoking"
                  onChange={handleChange('smoking')}
                >
                  <MenuItem value={'Yes'}>Yes</MenuItem>
                  <MenuItem value={'No'}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Disease field */}
            <Grid md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="disease">Disease</InputLabel>
                <OutlinedInput
                  id="disease"
                  value={formValues.disease}
                  onChange={handleChange('disease')}
                  label="Disease"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        {/* <Divider /> */}
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Stack spacing={1} alignItems="center">
            <Button type="submit" variant="contained" color="warning">
              Save details
            </Button>
            <Typography variant="overline">OR</Typography>
            <Button type="button" variant="outlined" color="error">
              Delete Account
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </form>
  );
}
