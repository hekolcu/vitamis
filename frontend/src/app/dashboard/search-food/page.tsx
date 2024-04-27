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



export const metadata = { title: `Search Food | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    
    return (
      <Stack spacing={3}>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid lg={8} md={6} xs={12}>
            <SearchForm></SearchForm>
          </Grid>
        </Grid>
      </Stack>
    );
  }


