'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export function SearchForm() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false); // new state

  React.useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const handleSearch = async () => {
    
    if (!query.trim()) {
      setErrorMessage('Lütfen gerekli alanları doldurunuz');
      return false;
    }

    try {
      const response = await fetch(`https://api.vitamis.hekolcu.com/food/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }finally {
      setSearchCompleted(true);
    }
  };

  return (
    <Stack spacing={2} style={{ width: '100%' }} >
      <Grid container spacing={3} direction="row" alignItems="center" justifyContent="center">
        <Grid item xs={12} lg={4} md={4}>
          <TextField
            fullWidth
            label="Yemek Ara"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Ara
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Grid item xs={12} lg={6} md={6} key={index}>
              <Card style={{ width: '100%', padding: '20px' }}>
                <Typography variant="h6" color={'#fa8805'} style={{ textAlign: 'left' }}>{result.category}</Typography>
                <Typography variant="subtitle1" style={{ textAlign: 'left', marginBottom: '5px' }}>{result.name}</Typography>
                {result.vitamins.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Vitaminler</TableCell>
                          <TableCell align="right">Ortalama</TableCell>
                          <TableCell align="right">Birim</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.vitamins.map((vitamin, idx) => (
                          <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                              {vitamin.name}
                            </TableCell>
                            <TableCell align="right">{vitamin.average}</TableCell>
                            <TableCell align="right">{vitamin.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" align='center'>Vitamin bilgisi mevcut değil</Typography>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          searchCompleted && <Typography variant="body2" align='center' marginTop={'20px'} color={'red'} fontWeight={'bold'}>Yemek bulunmuyor</Typography>
        )}
      </Grid>
    </Stack>
  );
}
