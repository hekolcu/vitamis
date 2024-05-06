'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export function AddMealForm() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
    const [selectedFoodItem, setSelectedFoodItem] = useState<FoodSearchItem | null>(null);
    const [text, setText] = useState('');
    const [gram, setGram] = useState(0);
    const [addedItems, setAddedItems] = useState<{ name: string; gram: number; foodId: number }[]>([]);
    const isAddButtonDisabled = !selectedFoodItem || !gram;
    const token = localStorage.getItem('custom-auth-token');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleDelete = (index: number) => {
        const newItems = [...addedItems];
        newItems.splice(index, 1);
        setAddedItems(newItems);
    };

    const handleSearch = async () => {
        if (!query) {
            setShowError(true);
            return;
        }
        setShowError(false);
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/search?q=${query}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        setSearchPerformed(true);
    };

    const handleAddFoodIntake = async (foodId: number, amount: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/tracking/add?foodId=${foodId}&amount=${amount}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.error('Failed to add food intake:', response.statusText);
                return;
            }
            const data = await response.json();
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
                foodId: selectedFoodItem.foodId ?? 0,
            };
            setAddedItems([...addedItems, newItem]);
            setSelectedFoodItem(null);
            setText('');
            setGram(gram);
        }
        setItemAdded(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={12} lg={8} md={8}>
                    <TextField
                        fullWidth
                        label="Yiyecek Ara"
                        variant="outlined"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowError(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {showError && <Typography color="error">Please fill in the search field!</Typography>}
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Ara
                    </Button>
                </Grid>
                {searchPerformed && (searchResults.length > 0 ? (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <List>
                                    {searchResults.map((result, index) => (
                                        <ListItem button key={index} selected={selectedFoodItem === result} onClick={() => handleButtonClick(result)}>
                                            <ListItemText primary={result.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body1" align='center'>Vitamin bilgisi mevcut değil</Typography>
                    </Grid>
                ))}
                {selectedFoodItem && (
                    <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: '20px' }}>
                        <Grid item xs={12} lg={8} md={8}>
                            <TextField
                                fullWidth
                                label="Gram"
                                variant="outlined"
                                type="number"
                                onChange={(e) => setGram(parseInt(e.target.value))}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleAdd} disabled={isAddButtonDisabled}>
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {itemAdded && addedItems.length > 0 && (
                    <>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" align="center" alignItems="center" justifyContent="center">Eklenen öğünler</Typography>
                                    <List>
                                        {addedItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={`${item.name} - ${item.gram}g`} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={8} md={8}>
                            <Box display="flex" justifyContent="space-between" flexDirection="row">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#ba000d",
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#9a0007',
                                        },
                                    }}
                                    onClick={handleClear}>
                                    Sıfırla
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    disabled={addedItems.length === 0}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f57f17',
                                        },
                                    }}>
                                    Kaydet
                                </Button>
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </form>
    );
}
