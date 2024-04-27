'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Box, Card, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { CheckFat } from '@phosphor-icons/react';




export function AddMealForm() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
    const [selectedFoodItem, setSelectedFoodItem] = useState<FoodSearchItem | null>(null);
    const [text, setText] = useState('');
    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState(0);
    const [addedItems, setAddedItems] = useState<{ name: string; unit: string; amount: number }[]>([]);
    const isAddButtonDisabled = !selectedFoodItem || !unit || !amount;

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/search?q=${query}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
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
       // window.location.reload();
    };
    const handleAdd = () => {
        if (selectedFoodItem) {
            const newItem = {
                name: selectedFoodItem.name ?? '',
                unit: unit ?? '', 
                amount: amount ?? 0, 
            };
            setAddedItems([...addedItems, newItem]);
            setSelectedFoodItem(null);
            setText('');
            setUnit(unit)
            setAmount(amount);
        }
    };

    return (
        <Stack spacing={3}>
            <div>
            </div>
            <Grid container spacing={3} direction="column" alignItems="left">
                <Grid item xs={12} lg={8} md={8}>
                    <TextField
                        disabled
                        value={selectedFoodItem ? selectedFoodItem.name : "Food"}
                        variant="outlined"
                    />
                    <FormControl>
                <InputLabel style={{ width: '250px', marginLeft: '20px' }} htmlFor="name">Unit</InputLabel>
                <Select
                  label="Unit"
                  onChange={(e) => setUnit(e.target.value as string)}
                  style={{ width: '250px', marginLeft: '20px' }}
                >
                    <MenuItem value="Küçük Yumurta Boyutunda">Küçük Yumurta Boyutunda</MenuItem>
                    <MenuItem value="Avuç İçi Kadar">Avuç İçi Kadar</MenuItem>
                    <MenuItem value="Adet">Adet</MenuItem>
                    <MenuItem value="Parmak Boyutunda">Parmak Boyutunda</MenuItem>
                    <MenuItem value="Yemek Kaşığı (Silme)">Yemek Kaşığı (Silme)</MenuItem>
                    <MenuItem value="Yemek Kaşığı (Tepeleme)">Yemek Kaşığı (Tepeleme)</MenuItem>
                    <MenuItem value="Ince Dilim">Ince Dilim</MenuItem>
                    <MenuItem value="Orta Boyun Yarısı">Orta Boyun Yarısı</MenuItem>
                    <MenuItem value="Yemek Kaşığı">Yemek Kaşığı</MenuItem>
                    <MenuItem value="Su Bardağı">Su Bardağı</MenuItem>
                </Select>
              </FormControl>
              <TextField
                        label= "Amount"
                        variant="outlined"
                        type="number"
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        style={{ width: '250px', marginLeft: '20px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAdd} style={{marginLeft: '20px' }} disabled={isAddButtonDisabled}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12} lg={8} md={8}>
                    <TextField
                        label="Search Food"
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <div>
                {searchResults.map((result, index) => (
                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left'}} key={index}>
                        <Card style={{ width: '250px', height: '70px' }}>
                            <Typography variant="h6" style={{ textAlign: 'center' }}>{result.name}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="check" className="checkmark-button" onClick={() => handleButtonClick(result)}>
                                    <CheckFat />
                                </IconButton>
                            </Box>
                        </Card>
                    </div>
                ))}
            </div>
            <Card>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h6">Added Items:</Typography>
                <ul>
                    {addedItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.amount} {item.unit}
                        </li>
                    ))}
                </ul>
            </div>
            </Card>
            <Button variant="contained" color="primary" onClick={handleClear}>
                        Clear
            </Button>
            <Button variant="contained" color="warning" onClick={handleSubmit} disabled={addedItems.length===0}>
                        Finalize
            </Button>
        </Stack>
    );
}
