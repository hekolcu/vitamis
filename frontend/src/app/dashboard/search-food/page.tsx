import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { FoodSearchItem } from '@/types/FoodSearchItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import { SearchForm } from '@/components/dashboard/search-food/search-food-form';
import { config } from '@/config';
import type { Metadata } from 'next';



export const metadata = { title: `Yiyecek Ara | Gösterge Paneli | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {

  return (
    <Stack width={'100%'} spacing={3}>
      <div>
        <Typography variant="h4" color={'#fa8805'} align='center'>Yemek Ara</Typography>
      </div>
      <SearchForm />
    </Stack>
  );
}


