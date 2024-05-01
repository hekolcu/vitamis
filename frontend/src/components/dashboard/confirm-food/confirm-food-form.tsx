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
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PendingFood } from '@/types/PendingFood';
import { FoodDB } from '@/types/FoodDB';
import Divider from '@mui/material/Divider';
import { Check } from '@phosphor-icons/react';
import { X } from '@phosphor-icons/react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export function ConfirmFoodForm(): React.JSX.Element {
    const token = localStorage.getItem('custom-auth-token');
    const [selectedFoodItem, setSelectedFoodItem] = React.useState<PendingFood | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogOpen2, setDialogOpen2] = React.useState(false);
    const [foodDBArray, setFoodDBArray] = React.useState<FoodDB[]>([]);
    const [pendingList,setPendingList ] = React.useState<PendingFood[]>([]);

    const confirmPendingFood = async (pendingFoodId: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/pending/confirm?pendingFoodId=${pendingFoodId}`, {
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
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }

    const rejectPendingFood = async (pendingFoodId: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/pending/reject?pendingFoodId=${pendingFoodId}`, {
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
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }

    const getPendingList = async () =>{ 
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/food/pending/list', {
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
            const formattedList = data.map((item: { name: any; category: any; vitamins: any[]; foodId: any; }) => ({
                name: item.name,
                category: item.category,
                vitamins: item.vitamins.map(vitamin => ({
                    name: vitamin.name,
                    average: parseFloat(vitamin.average),
                    unit: vitamin.unit,
                    minimum: parseFloat(vitamin.minimum),
                    maximum: parseFloat(vitamin.maximum)
                })),
                foodId: item.foodId
            }));
            setPendingList(formattedList)
            console.log('Pending List:', formattedList);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }


    const handleCheckButtonClick= (item: PendingFood) =>{
        setSelectedFoodItem(item);
        console.log(foodDBArray)
        setDialogOpen(true);
    }
    const handleCrossButtonClick= (item: PendingFood) =>{
        setSelectedFoodItem(item);
        console.log(item.foodId)
        setDialogOpen2(true);
    }
    const handleDialogClose= () =>{
        setFoodDBArray([]);
        setDialogOpen(false);
      }
      const handleDialogConfirm=(item: PendingFood) =>{
        confirmPendingFood(item.foodId)
        window.location.reload();
        setDialogOpen(false);
      }

      const handleDialogClose2= () =>{
        setDialogOpen2(false);
      }
      const handleDialogConfirm2=(item: PendingFood) =>{
        //console.log(item.foodId)
        rejectPendingFood(item.foodId)
        window.location.reload();
        setDialogOpen2(false);
      }

      React.useEffect(() => {
        getPendingList();
    }, []);

    return (
        <>
            {pendingList.map((item: PendingFood) => (
                <Card key={item.name} sx={{ display: 'flex', marginBottom: '8px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Group: {item.category}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Vitamins:
                            </Typography>
                            <ul>
                                {item.vitamins.map((vitamin, index) => (
                                    <li key={index}>
                                        {vitamin.name} <br></br>Unit: ({vitamin.unit}) Avg: {vitamin.average} Min: {vitamin.minimum} Max: {vitamin.maximum}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCheckButtonClick(item)}>

                                <Check />
                            </IconButton>
                            <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCrossButtonClick(item)}>

                                <X />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            ))}
            
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title">
                    Confirmation
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Do you want to add this food item to the database?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button color="warning" autoFocus onClick={() => handleDialogConfirm(selectedFoodItem!)}>
                        Confirm
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen2} onClose={handleDialogClose}>
                <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title2">
                    Confirmation
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Do you want to delete this food item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" autoFocus onClick={handleDialogClose2}>
                        Cancel
                    </Button>
                    <Button color="warning" autoFocus onClick={() => handleDialogConfirm2(selectedFoodItem!)}>
                        Delete
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
