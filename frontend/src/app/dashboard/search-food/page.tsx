'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';




export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
  
    React.useEffect(() => {
      console.log(searchResults);
    }, [searchResults]); // This effect will re-run whenever searchResults changes
  
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
            <Typography variant="h4" color={'#fa8805'} align='center'>Food Search</Typography>
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
    <div key={index}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>{result.name}</Typography>
      <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Category: {result.category}</Typography>
      <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Vitamins:</Typography>
      {result.vitamins.length > 0 ? (
        <ul style={{ listStylePosition: 'inside', textAlign: 'center', paddingInlineStart: 'unset' }}> {/* Aligning the bullet points */}
          {result.vitamins.map((vitamin, idx) => (
            <li key={idx}>
              {vitamin.name}: {vitamin.average} {vitamin.unit}
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2" align='center'>No vitamin information available</Typography>
      )}
    </div>
    ))}
    </div>
        </Stack>
      );
  }


