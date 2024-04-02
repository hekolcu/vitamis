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

    const [foodItem, setFoodItem] = React.useState<FoodItem>({
      name: '',
      id: '',
      group:'',
      vitamins: [{vitamin: '', unit: '', average:0, minimum: 0, maximum:0}]
    });

    const [foodItems, setFoodItems] = React.useState<FoodItem[]>([]);

    React.useEffect(() => {
      console.log(foodItems); // Log the updated foodItems array
    }, [foodItems]); // Log only when foodItems changes

    const handleInputChange = (index: number, field: string, value: string | number) => {
      const updatedVitamins = [...foodItem.vitamins];
      updatedVitamins[index] = { ...updatedVitamins[index], [field]: value };
      setFoodItem({ ...foodItem, vitamins: updatedVitamins });
      
      // Check if every field is filled
      const isAnyVitaminFilled = updatedVitamins.every(
      vitamin => vitamin.vitamin !== '' && vitamin.unit !== '' && vitamin.average !== 0 && vitamin.minimum !== 0 && vitamin.maximum !== 0
      ) && foodItem.name !== '' && foodItem.group !== '';
      setIsVitaminFilled(isAnyVitaminFilled);
    };
    
  const handleDialogClose= () =>{
    setDialogOpen(false);
    window.location.reload();
  }

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [isVitaminFilled, setIsVitaminFilled] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(foodItem);
      setDialogOpen(true);

      setFoodItems(prevFoodItems => [...prevFoodItems, foodItem]); // Append current foodItem to foodItems array
        // Clearing the values of vitamins in foodItem state
    const clearedVitamins = foodItem.vitamins.map(vitamin => ({
      ...vitamin,
      vitamin: '',
      unit: '',
      average: 0,
      minimum: 0,
      maximum: 0
    })
  );

  //setFoodItem({ ...foodItem, name: '', group:'', vitamins: clearedVitamins });

  setIsVitaminFilled(false);
    
    };
  
    const addVitamin = () => {
      setFoodItem({
        ...foodItem,
        vitamins: [...foodItem.vitamins, { vitamin: '', unit: '', average: 0, minimum: 0, maximum: 0 }]
      });

      setIsVitaminFilled(false)
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Submit for confirmation" title="Add Food Item" />
          <CardContent>
          <Grid spacing={2}>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Food Name</InputLabel>
                <OutlinedInput
                  label="Food Name"
                  id="foodname"
                  value={foodItem.name}
                  onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Group Name</InputLabel>
                <Select
                  label="Group Name"
                  id="groupname"
                  value={foodItem.group}
                  onChange={(e) => setFoodItem({ ...foodItem, group: e.target.value })}
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
                <Grid xs={12}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id={`vitamin-name-${index}`}>Vitamin</InputLabel>
                        <Select
                          labelId={`vitamin-name-${index}`}
                          label="Vitamin"
                          value={vitamin.vitamin}
                          onChange={(e) => handleInputChange(index, 'vitamin', e.target.value)}
                        
                        >
                          <MenuItem value="Vitamin A">Vitamin A</MenuItem>
                          <MenuItem value="Vitamin B-1">Vitamin B-1</MenuItem>
                          <MenuItem value="Vitamin B-2">Vitamin B-2</MenuItem>
                          <MenuItem value="Vitamin B-3">Vitamin B-3</MenuItem>
                          <MenuItem value="Vitamin B-5">Vitamin B-5</MenuItem>
                          <MenuItem value="Vitamin B-6">Vitamin B-6</MenuItem>
                          <MenuItem value="Vitamin B-6, toplam">Vitamin B-6, toplam</MenuItem>
                          <MenuItem value="Vitamin B-7">Vitamin B-7</MenuItem>
                          <MenuItem value="Vitamin B-9">Vitamin B-9</MenuItem>
                          <MenuItem value="Vitamin B-12">Vitamin B-12</MenuItem>
                          <MenuItem value="Vitamin C">Vitamin C</MenuItem>
                          <MenuItem value="Vitamin D">Vitamin D</MenuItem>
                          <MenuItem value="Vitamin D, IU">Vitamin D, IU</MenuItem>
                          <MenuItem value="Vitamin D-3">Vitamin D-3</MenuItem>
                          <MenuItem value="Vitamin E">Vitamin E</MenuItem>
                          <MenuItem value="Vitamin E, IU">Vitamin E, IU</MenuItem>
                          <MenuItem value="Vitamin K">Vitamin K</MenuItem>
                          <MenuItem value="Vitamin K-1">Vitamin K-1</MenuItem>
                          <MenuItem value="Vitamin K-2">Vitamin K-2</MenuItem>
                          <MenuItem value="Vitamin P">Vitamin P</MenuItem>

                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={6}>
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
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id={`average-${index}`}></InputLabel>
                        <TextField
                          label="Average"
                          type="number"
                          value={vitamin.average}
                          onChange={(e) => handleInputChange(index, 'average', Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id={`minimum-${index}`}></InputLabel>
                        <TextField
                          label="Minimum"
                          type="number"
                          value={vitamin.minimum}
                          onChange={(e) => handleInputChange(index, 'minimum', Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id={`maximum-${index}`}></InputLabel>
                        <TextField
                          label="Maximum"
                          type="number"
                          value={vitamin.maximum}
                          onChange={(e) => handleInputChange(index, 'maximum', Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
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
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        
      >
        <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title">
        Food Item Submitted For Confirmation Successfully!
        </DialogTitle>
        <DialogContent dividers>
    {foodItem !== null && (
      <React.Fragment>
        <Typography gutterBottom>
          Food Name: {foodItem.name}<br/> Food Group: {foodItem.group}
        </Typography>
        <Divider/>
        {foodItem.vitamins.map((vitamin, index) => (
          <Grid key={index}>
          <Typography gutterBottom>
            Vitamin: {vitamin.vitamin}<br/> Unit: {vitamin.unit}<br/> Average: {vitamin.average}<br/> Minimum: {vitamin.minimum}<br/> Maximum: {vitamin.maximum}
          </Typography>
          <Divider/>
          </Grid>
        ))}
      </React.Fragment>
    )}
  </DialogContent>
      <DialogActions>
        <Button color= "warning" autoFocus onClick={handleDialogClose}>
        Confirm
        </Button>
      </DialogActions>
      </BootstrapDialog>
      </form>
    );
    
    
    
    
      
  }
