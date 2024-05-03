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
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PendingFood } from '@/types/PendingFood';
import { FoodItem } from '@/types/FoodItem';
import { FoodDB } from '@/types/FoodDb';
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
    const [pendingList, setPendingList] = React.useState<PendingFood[]>([]);

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
                return;
            }
        } catch (error) {
            console.error('Error confirming food:', error);
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
                return;
            }
        } catch (error) {
            console.error('Error rejecting food:', error);
        }
    }

    const getPendingList = async () => {
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

    const handleCheckButtonClick = (item: PendingFood) => {
        setSelectedFoodItem(item);
        setDialogOpen(true);
    }
    const handleCrossButtonClick = (item: PendingFood) => {
        setSelectedFoodItem(item);
        console.log(item.foodId)
        setDialogOpen2(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogConfirm = (item: PendingFood) => {
        confirmPendingFood(item.foodId)
        window.location.reload();
        setDialogOpen(false);
    }

    const handleDialogClose2 = () => {
        setDialogOpen2(false);
    }
    const handleDialogConfirm2 = (item: PendingFood) => {
        //console.log(item.foodId)
        rejectPendingFood(item.foodId)
        window.location.reload();
        setDialogOpen2(false);
    }

    React.useEffect(() => {
        getPendingList();
    }, []);

    return (
        <Grid container spacing={2} direction="row">
            {pendingList.map((item: PendingFood) => (
                <Grid xs={12} md={6} lg={6} key={item.name} component="div">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color={'#fa8805'}>
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" marginBottom={'10px'}>
                                Group: {item.category}
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vitamin</TableCell>
                                            <TableCell align="right">Unit</TableCell>
                                            <TableCell align="right">Avg</TableCell>
                                            <TableCell align="right">Min</TableCell>
                                            <TableCell align="right">Max</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {item.vitamins.map((vitamin, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {vitamin.name}
                                                </TableCell>
                                                <TableCell align="right">{vitamin.unit}</TableCell>
                                                <TableCell align="right">{vitamin.average}</TableCell>
                                                <TableCell align="right">{vitamin.minimum}</TableCell>
                                                <TableCell align="right">{vitamin.maximum}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <IconButton sx={{
                                fontSize: '2rem',
                                backgroundColor: 'orange',
                                border: '5px solid deepOrange',
                                m: 1,
                                p: 1,
                                ':hover': {
                                    backgroundColor: '#dcedc8',
                                },
                            }} aria-label="check" onClick={() => handleCheckButtonClick(item)}>
                                <Check color="primary" />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle id="customized-dialog-title">
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
            </Dialog>
        </Grid>

    );
}
