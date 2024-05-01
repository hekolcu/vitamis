'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';




export  function SearchForm() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
  
    React.useEffect(() => {
      console.log(searchResults);
    }, [searchResults]);
  
    const handleSearch = async () => {
      try {
        const response = await fetch(`https://api.vitamis.hekolcu.com/food/search?q=${query}`);
        const data = await response.json();
        setSearchResults(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    return (
        <Stack spacing={3}>
          <div>
            
          </div>
          <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item xs={12} lg={8} md={8}>
              <TextField
                fullWidth
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card style={{ width: '500px' }} key={index}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>{result.name}</Typography>
      <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Category: {result.category}</Typography>
      <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Vitamins:</Typography>
      {result.vitamins.length > 0 ? (
        <ul style={{ listStylePosition: 'inside', textAlign: 'center', paddingInlineStart: 'unset' }}> {}
          {result.vitamins.map((vitamin, idx) => (
            <li key={idx}>
              {vitamin.name}: {vitamin.average} {vitamin.unit}
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2" align='center'>No vitamin information available</Typography>
      )}
    </Card>
    </div>
    ))}
    </div>
        </Stack>
      );
  }