'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FoodItem } from '@/types/FoodItem';
import Divider from '@mui/material/Divider';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function AddFoodForm(): React.JSX.Element {
  const token = localStorage.getItem('custom-auth-token');
  const [vitaminList, setVitaminList] = React.useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const addFood = async () => {
    try {
      const response = await fetch('https://api.vitamis.hekolcu.com/food/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: foodItem.name,
          category: foodItem.category,
          vitamins: foodItem.vitamins.map(vitamin => ({
            name: vitamin.name,
            average: vitamin.average,
            unit: vitamin.unit,
            minimum: vitamin.minimum,
            maximum: vitamin.maximum
          }))
        })
      });

      if (!response.ok) {
        console.error('Failed to add food intake:', response.statusText);
        return;
      }

      const responseData = await response.text();
      if (!responseData) {
        console.error('Empty response received.');
        return;
      }

      const data = JSON.parse(responseData);

      console.log('Food intake added successfully:', data);
    } catch (error) {
      console.error('Error adding food intake:', error);
    }
  }


  const getVitaminList = async () => {
    try {
      const response = await fetch('https://api.vitamis.hekolcu.com/vitamin/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },

      });
      if (!response.ok) {
        console.error('Failed to retrieve list:', response.statusText);
        return;
      }
      const data = await response.json();
      //console.log('List:', data);
      setVitaminList(data);
    } catch (error) {
      console.error('Error retrieving list:', error);
    }
  }


  const [foodItem, setFoodItem] = React.useState<FoodItem>({
    name: '',
    category: '',
    vitamins: [{ name: '', unit: '', average: 0, minimum: 0, maximum: 0 }]
  });

  const handleInputChange = (index: number, field: string, value: string | number) => {
    if (field === 'vitamin') {
      console.error("Invalid field name 'vitamin' detected in handleInputChange.");
      return;
    }

    if (field === 'average' || field === 'minimum' || field === 'maximum') {
      value = Math.max(0, Number(value));
    }

    const updatedVitamins = [...foodItem.vitamins];
    updatedVitamins[index] = { ...updatedVitamins[index], [field]: value };
    setFoodItem({ ...foodItem, vitamins: updatedVitamins });

    const isAnyVitaminFilled = updatedVitamins.every(
      vitamin => vitamin.name !== '' && vitamin.unit !== '' && vitamin.average !== 0 && vitamin.minimum !== 0 && vitamin.maximum !== 0
    ) && foodItem.name !== '' && foodItem.category !== '';
    setIsVitaminFilled(isAnyVitaminFilled);
  };


  const [isVitaminFilled, setIsVitaminFilled] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(foodItem);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    window.location.reload();
    setDialogOpen(false);
  }

  const handleDialogConfirm = () => {
    addFood();
    window.location.reload();
    setDialogOpen(false);
  }
  const addVitamin = () => {
    setFoodItem({
      ...foodItem,
      vitamins: [...foodItem.vitamins, { name: '', unit: '', average: 0, minimum: 0, maximum: 0 }]
    });

    setIsVitaminFilled(false)
  };

  React.useEffect(() => {
    getVitaminList();
  }, []);

  return (
    <Stack spacing={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Card style={{ width: '100%' }}>
            <CardHeader subheader="Submit for confirmation" title="Add Food Item" />
            <CardContent>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent={'center'} alignItems={'center'}>
                <Grid xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="name">Food Name</InputLabel>
                    <OutlinedInput
                      label="Food Name"
                      id="foodname"
                      value={foodItem.name}
                      onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })} />
                  </FormControl>
                </Grid>
                <Grid xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="name">Group Name</InputLabel>
                    <Select
                      label="Group Name"
                      id="groupname"
                      value={foodItem.category}
                      onChange={(e) => setFoodItem({ ...foodItem, category: e.target.value })}
                    >
                      <MenuItem value="Süt ve süt ürünleri">Süt ve süt ürünleri</MenuItem>
                      <MenuItem value="Yumurta ve yumurta ürünleri">Yumurta ve yumurta ürünleri</MenuItem>
                      <MenuItem value="Et ve et ürünleri">Et ve et ürünleri</MenuItem>
                      <MenuItem value="Balık ve su ürünleri">Balık ve su ürünleri</MenuItem>
                      <MenuItem value="Sıvı ve katı yağlar">Sıvı ve katı yağlar</MenuItem>
                      <MenuItem value="Tahıl ve tahıl ürünleri">Tahıl ve tahıl ürünleri</MenuItem>
                      <MenuItem value="Yağlı tohumlar ve kuru baklagiller">Yağlı tohumlar ve kuru baklagiller</MenuItem>
                      <MenuItem value="Sebze ve sebze ürünleri">Sebze ve sebze ürünleri</MenuItem>
                      <MenuItem value="Meyve ve meyve ürünleri">Meyve ve meyve ürünleri</MenuItem>
                      <MenuItem value="Şeker ve şekerli ürünler">Şeker ve şekerli ürünler</MenuItem>
                      <MenuItem value="İçecekler">İçecekler</MenuItem>
                      <MenuItem value="Muhtelif gıda">Muhtelif gıda</MenuItem>
                      <MenuItem value="Geleneksel gıdalar">Geleneksel gıdalar</MenuItem>
                      <MenuItem value="Özel beslenme amaçlı gıdalar">Özel beslenme amaçlı gıdalar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {foodItem.vitamins.map((vitamin, index) => (
                  <React.Fragment key={index}>
                    <Grid sx={{ marginTop: '10px' }} container rowSpacing={3} alignItems={'center'} justifyContent={'center'} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                      <Divider />
                      <Grid xs={12} lg={3}>
                        <FormControl fullWidth>
                          <InputLabel id={`vitamin-name-${index}`}>Vitamin</InputLabel>
                          <Select
                            labelId={`vitamin-name-${index}`}
                            label="Vitamin"
                            value={vitamin.name || ''}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                          >
                            {vitaminList.map((vitaminName, index) => (
                              <MenuItem key={index} value={vitaminName}>{vitaminName}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid xs={12} lg={3} >
                        <FormControl fullWidth>
                          <InputLabel id={`unit-${index}`}>Unit</InputLabel>
                          <Select
                            labelId={`unit-${index}`}
                            label="Unit"
                            value={vitamin.unit}
                            onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                          >
                            <MenuItem value="mg">mg</MenuItem>
                            <MenuItem value="RE">RE</MenuItem>
                            <MenuItem value="IU">IU</MenuItem>
                            <MenuItem value="α-TE">α-TE</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid xs={12} lg={2}>
                        <FormControl fullWidth>
                          <InputLabel id={`average-${index}`}></InputLabel>
                          <TextField
                            label="Average"
                            type="number"
                            value={vitamin.average}
                            onChange={(e) => handleInputChange(index, 'average', Number(e.target.value))} />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} lg={2}>
                        <FormControl fullWidth>
                          <InputLabel id={`minimum-${index}`}></InputLabel>
                          <TextField
                            label="Minimum"
                            type="number"
                            value={vitamin.minimum}
                            onChange={(e) => handleInputChange(index, 'minimum', Number(e.target.value))} />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} lg={2}>
                        <FormControl fullWidth>
                          <InputLabel id={`maximum-${index}`}></InputLabel>
                          <TextField
                            label="Maximum"
                            type="number"
                            value={vitamin.maximum}
                            onChange={(e) => handleInputChange(index, 'maximum', Number(e.target.value))} />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <Button variant="contained" color="primary" onClick={addVitamin} disabled={!isVitaminFilled}>
                  Add Vitamin
                </Button>
                <Button type="submit" variant="contained" color="warning" disabled={!isVitaminFilled}>
                  Submit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      </form>
      <Dialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle id="customized-dialog-title2" sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }}>
          Confirmation
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Do you want to suggest this food item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="warning" autoFocus onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="warning" autoFocus onClick={handleDialogConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );





}
