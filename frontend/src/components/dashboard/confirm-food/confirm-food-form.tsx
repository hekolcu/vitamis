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
import { FoodItem } from '@/types/FoodItem';
import { FoodDB } from '@/types/FoodDb';
import Divider from '@mui/material/Divider';
import { CheckFat } from '@phosphor-icons/react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ConfirmFoodProps {
    foodItems: FoodItem[];
}

let currentIdCounter = 1;


export function ConfirmFoodForm({ foodItems }: ConfirmFoodProps): React.JSX.Element {
    const [selectedFoodItem, setSelectedFoodItem] = React.useState<FoodItem | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [foodDBArray, setFoodDBArray] = React.useState<FoodDB[]>([]);

const generateId = (): string => {
    const id = `MA-${currentIdCounter}`;
    currentIdCounter++;
    return id;
};
    const convertFoodItemToFoodDB = (foodItem: FoodItem): FoodDB[] => {
        const foodDBArray: FoodDB[] = [];

        foodItem.vitamins.forEach(vitamin => {
            foodDBArray.push({
                name: foodItem.name,
                id: generateId(),
                group: foodItem.group,
                vitamin: vitamin.vitamin,
                unit: vitamin.unit,
                average: vitamin.average,
                minimum: vitamin.minimum,
                maximum: vitamin.maximum,
            });
        });

        return foodDBArray;
    };

    const handleButtonClick= (item: FoodItem) =>{
        setSelectedFoodItem(item);
        const foodDBArray = convertFoodItemToFoodDB(item);
        console.log(foodDBArray)
        setDialogOpen(true);
    }
    const handleDialogClose= () =>{
        setFoodDBArray([]);
        currentIdCounter = 1;
        setDialogOpen(false);
      }
      const handleDialogConfirm=() =>{
        setDialogOpen(false);
        window.location.reload();
      }
    return (
        <>
            {foodItems.map((item: FoodItem) => (
                <Card key={item.name} sx={{ display: 'flex', marginBottom: '8px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Group: {item.group}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Vitamins:
                            </Typography>
                            <ul>
                                {item.vitamins.map((vitamin, index) => (
                                    <li key={index}>
                                        {vitamin.vitamin} <br></br>Unit: ({vitamin.unit}) Avg: {vitamin.average} Min: {vitamin.minimum} Max: {vitamin.maximum}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="check" className="checkmark-button" onClick={() => handleButtonClick(item)}>

                                <CheckFat />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            ))}
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title">
                    Food Item Details
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Do you want to add this food item to the database?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button color="warning" autoFocus onClick={handleDialogConfirm}>
                        Confirm
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
