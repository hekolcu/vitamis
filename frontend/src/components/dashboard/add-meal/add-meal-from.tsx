'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { CheckFat } from '@phosphor-icons/react';
import { get } from 'http';




export function AddMealForm() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
    const [selectedFoodItem, setSelectedFoodItem] = useState<FoodSearchItem | null>(null);
    const [text, setText] = useState('');
    const [gram, setGram] = useState(0);
    const [addedItems, setAddedItems] = useState<{ name: string; gram: number; foodId: number }[]>([]);
    const isAddButtonDisabled = !selectedFoodItem || !gram;
    const token = localStorage.getItem('custom-auth-token');

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/search?q=${query}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const getList = async () => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/tracking/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your access token here
                    'Content-Type': 'application/json'
                },
                // Additional options like credentials, mode, etc. if needed
            });
            if (!response.ok) {
                // Handle non-OK responses here
                console.error('Failed to retrieve list:', response.statusText);
                return;
            }
            const data = await response.json();
            // Handle the response data here
            console.log('List:', data);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    };

    const handleAddFoodIntake = async (foodId: number, amount: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/tracking/add?foodId=${foodId}&amount=${amount}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                // Additional options like credentials, mode, etc. if needed
            });
            if (!response.ok) {
                // Handle non-OK responses here
                console.error('Failed to add food intake:', response.statusText);
                return;
            }
            const data = await response.json();
            // Handle the response data here if needed
            console.log('Food intake added successfully:', data);
        } catch (error) {
            console.error('Error adding food intake:', error);
        }
    };

    const handleButtonClick = (selectedItem: FoodSearchItem) => {
        setSelectedFoodItem(selectedItem);
        if (selectedItem.name !== null) {
            setText(selectedItem.name);
        }
    };
    const handleClear = () => {
        setAddedItems([]);
    };

    const handleSubmit = () => {
        console.log(addedItems)
        addedItems.forEach((item, index) => {
            handleAddFoodIntake(item.foodId, item.gram);
        });
    };
    const handleAdd = () => {
        if (selectedFoodItem) {
            const newItem = {
                name: selectedFoodItem.name ?? '',
                gram: gram ?? 0,
                foodId: selectedFoodItem.foodId ?? 0 , 
            };
            setAddedItems([...addedItems, newItem]);
            setSelectedFoodItem(null);
            setText('');
            setGram(gram);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
            <div>
            </div>
            <Card>
            <CardHeader subheader="Add Food to Your Meal!" title="Create Meal" />
                <CardContent>
            <Grid container spacing={3} direction="column" >
                <Grid item xs={12} lg={8} md={8}>
                    <TextField
                        disabled
                        value={selectedFoodItem ? selectedFoodItem.name : "Food (Use the Search Function Below)"}
                        variant="outlined"
                        style={{ marginTop:'20px'}}
                        fullWidth
                    />
               </Grid>
               <Grid item xs={12} lg={8} md={8}>
              <TextField
                        label= "Grams"
                        variant="outlined"
                        type="number"
                        onChange={(e) => setGram(parseInt(e.target.value))}
                        fullWidth
                    />
                    
                </Grid>
                <Grid item xs={12} lg={8} md={8} >
                <Button variant="contained" color="primary" onClick={handleAdd} style={{marginTop: '10px' }} fullWidth disabled={isAddButtonDisabled}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12} lg={8} md={8}>
                    <TextField
                        fullWidth
                        style={{marginTop:'20px', marginBottom:'10px'}}
                        label="Search Food"
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />  
                </Grid>
                <Grid item xs={12} lg={8} md={8} marginBottom={5}>
                    <Button variant="contained" color="primary" onClick={handleSearch} fullWidth >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <div>
                {searchResults.map((result, index) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'10px', marginBottom:'10px'}} key={index}>
                        <Card>
                            <CardContent>
                            <Typography variant="h6" style={{ textAlign: 'center' }}>{result.name}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="check" className="checkmark-button" onClick={() => handleButtonClick(result)}>
                                    <CheckFat />
                                </IconButton>
                            </Box>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            </CardContent>
            </Card>
            <Card>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h6">Added Items:</Typography>
                <ul>
                    {addedItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.gram}g
                        </li>
                    ))}
                </ul>
            </div>
            </Card>
            <Button variant="contained" color="primary" onClick={handleClear}>
                        Clear
            </Button>
            <Button type="submit" variant="contained" color="warning" disabled={addedItems.length===0}>
                        Finalize
            </Button>
        </Stack>
        </form>
    );
}
