import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { FoodItem } from '@/types/FoodItem';
import {ConfirmFoodForm} from '@/components/dashboard/confirm-food/confirm-food-form';
/*
const foodItems: FoodItem[] = [
    {
        name: 'Apple',
        group: 'Fruits',
        vitamins: [
            {
                vitamin: 'Vitamin C',
                unit: 'mg',
                average: 5,
                minimum: 3,
                maximum: 7,
            },
            {
                vitamin: 'Vitamin 1',
                unit: 'mg',
                average: 5,
                minimum: 1,
                maximum: 9,
            },
            // Add more vitamins if needed
        ],
    },
    {
        name: 'Pear',
        group: 'Fruits',
        vitamins: [
            {
                vitamin: 'Vitamin C',
                unit: 'mg',
                average: 5,
                minimum: 3,
                maximum: 7,
            },
            {
                vitamin: 'Vitamin 1',
                unit: 'mg',
                average: 5,
                minimum: 1,
                maximum: 9,
            },
            // Add more vitamins if needed
        ],
    },
    // Add more food items if needed
];
*/
export const metadata = { title: `Confirm Food | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h4" color={'#fa8805'} align='center'>Confirm Food Item</Typography>
        </div>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          <Grid lg={8} md={6} xs={12}>
            <ConfirmFoodForm/>
          </Grid>
        </Grid>
      </Stack>
    );
  }