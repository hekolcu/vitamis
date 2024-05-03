'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import { FoodItem } from '@/types/FoodItem';
import { FoodDB } from '@/types/FoodDB';
import { Check } from '@mui/icons-material';


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

    const handleButtonClick = (item: FoodItem) => {
        setSelectedFoodItem(item);
        const foodDBArray = convertFoodItemToFoodDB(item);
        console.log(foodDBArray)
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setFoodDBArray([]);
        currentIdCounter = 1;
        setDialogOpen(false);
    }
    const handleDialogConfirm = () => {
        setDialogOpen(false);
        window.location.reload();
    }
    return (
        <Grid container spacing={2} direction="row">
            {foodItems.map((item: FoodItem) => (
                <Grid xs={12} md={6} lg={6} key={item.name} component="div">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color={'#fa8805'}>
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" marginBottom={'10px'}>
                                Group: {item.group}
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
                                                    {vitamin.vitamin}
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
                            }} aria-label="check" onClick={() => handleButtonClick(item)}>
                                <Check color='black' />
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
