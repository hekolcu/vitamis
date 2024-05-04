'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import { updateProfile } from '../../../lib/auth/auth-utils';
import { useUser } from '@/hooks/use-user';
import { logger } from '@/lib/default-logger';
import { Snackbar, Alert } from '@mui/material';

export function AccountDetailsForm(): React.JSX.Element {
  const { user } = useUser();

  React.useEffect(() => {
    logger.debug(user);
  }, [user]);

  const [formValues, setFormValues] = React.useState({
    height: user?.height ? user.height.toString() : '',
    weight: user?.weight ? user.weight.toString() : '',
    dob: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    disease: user?.disease ? user.disease : '',
    sunExposure: user?.sunExposure ? user.sunExposure : '',
    smoking: user?.smoking ?? '',
    gender: user?.gender ? user.gender : '',
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Handle changes in form inputs
  const handleChange = (prop: string) => (event: string) => {
    setFormValues({ ...formValues, [prop]: event });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('custom-auth-token');
    if (token === null) {
      // Handle token not found
      return;
    }

    updateProfile(token, {
      gender: formValues.gender,
      height: Number(formValues.height),
      weight: Number(formValues.weight),
      disease: formValues.disease,
      sunExposure: formValues.sunExposure,
      smoking: formValues.smoking === 'Yes',
      dateOfBirth: formValues.dob,
    }).then((response) => {
      setSnackbarOpen(true);
      logger.debug(response);
      return response;
    }).catch((error) => {
      logger.error(error);
      return false;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader subheader="Bilgiler düzenlenebilir" title="Hesabım" />
        {/* <Divider /> */}
        <CardContent>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Height field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="height">Boy</InputLabel>
                <OutlinedInput
                  id="height"
                  value={formValues.height}
                  onChange={(e) => { handleChange('height')(e.target.value) }}
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                  label="Height"
                  type="number"
                />
              </FormControl>
            </Grid>
            {/* Weight field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="weight">Kilo</InputLabel>
                <OutlinedInput
                  id="weight"
                  value={formValues.weight}
                  onChange={(e) => { handleChange('weight')(e.target.value) }}
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
                  label="Doğum Tarihi"
                  type="date"
                  value={formValues.dob}
                  onChange={(e) => { handleChange('dob')(e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            {/* Gender field */}
            <Grid xs={6}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Cinsiyet</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={formValues.gender}
                  label="Gender"
                  onChange={(e) => { handleChange('gender')(e.target.value) }}
                >
                  <MenuItem value='Male'>Erkek</MenuItem>
                  <MenuItem value='Female'>Kadın</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Sun exposure field */}
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sun-exposure-label">Güneşe maruz kalma</InputLabel>
                <Select
                  labelId="sun-exposure-label"
                  id="sun-exposure"
                  value={formValues.sunExposure}
                  label="Güneşe maruz kalma"
                  onChange={(e) => { handleChange('sunExposure')(e.target.value) }}
                >
                  <MenuItem value='Low'>Düşük</MenuItem>
                  <MenuItem value='Moderate'>Orta</MenuItem>
                  <MenuItem value='High'>Yüksek</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Smoking field */}
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel id="smoking-label">Sigara kullanma</InputLabel>
                <Select
                  labelId="smoking-label"
                  id="smoking"
                  value={formValues.smoking}
                  label="Sigara kullanma"
                  onChange={(e) => { handleChange('smoking')(e.target.value) }}
                >
                  <MenuItem value='Yes'>Evet</MenuItem>
                  <MenuItem value='No'>Hayır</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Disease field */}
            <Grid md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="disease">Hastalık</InputLabel>
                <OutlinedInput
                  id="disease"
                  value={formValues.disease}
                  onChange={(e) => { handleChange('disease')(e.target.value) }}
                  label="Disease"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        {/* <Divider /> */}
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding:'20px', width: '100%' }}>
            <Button type="button" variant="outlined" color="error">
              Hesabı sil
            </Button>
            <Button type="submit" variant="contained" color="warning">
              Ayrıntıları kaydet
            </Button>
          </Stack>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ bgcolor: 'green', color: 'white' }}
        >
          Başarıyla kaydedildi!
        </Alert>
      </Snackbar>
    </form>
  );
}
