'use client';

import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert } from '@mui/material';
import { useUser } from '@/hooks/use-user';


export function UpdatePasswordForm(): React.JSX.Element {
  const token = localStorage.getItem('custom-auth-token');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { user } = useUser();
  const handleCloseSnackbar = (event?: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const changePassword = async (email: string | undefined, currentPassword: string, newPassword: string) => {
    try {
        const requestBody = {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        const response = await fetch('https://api.vitamis.hekolcu.com/auth/password', {
            method: 'PATCH', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.error('Şifre güncellenemedi:', response.statusText);
            return false;
        }

        console.log('Password changed successfully for', email);
        return true;
    } catch (error) {
        console.error('Error changing password:', error);
        return false;
    }
};


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password === '' || newPassword === '' || confirmPassword === '') {
      setSnackbarMessage('Alanları doldurunuz !');
      setSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage('Parolalar uyuşmuyor !');
      setSnackbarOpen(true);
      return;
    }

    changePassword(user?.email,password,newPassword)
    setSnackbarMessage('Şifre başarıyla güncellendi.');
    setSnackbarOpen(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Şifre Güncelle" />
        <CardContent>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel>Şifre</InputLabel>
                <OutlinedInput
                  label="Şifre"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel>Yeni Şifre</InputLabel>
                <OutlinedInput
                  label="Yeni Şifre"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Şifreni Onayla</InputLabel>
                <OutlinedInput
                  label="Şifreni Onayla"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Button type="submit" variant="contained" color="warning">Güncelle</Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage === 'Şifre başarıyla güncellendi.' ? 'success' : 'error'}
          variant="filled"
          sx={{ bgcolor: snackbarMessage === 'Şifre başarıyla güncellendi.' ? 'green' : 'red', color: 'white' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form >
  );
}
