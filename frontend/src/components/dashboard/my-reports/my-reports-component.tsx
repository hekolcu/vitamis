'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FoodIntakeRecord } from '@/types/FoodIntakeRecord';

export function ViewReport() {
    const token = localStorage.getItem('custom-auth-token');
    const [foodIntakeRecord, setFoodIntakeRecord] = React.useState<FoodIntakeRecord>({
        foodIntakeId: 0,
        userId: 0,
        foodId: 0,
        food: {
          name: '',
          category: '',
          vitamins: [{
            name: '',
            average: '',
            unit: ''
          }],
          foodId: 0
        },
        amount: 0,
        date: ''
      });

    const [FoodIntakeRecords, setFoodIntakeRecords] = React.useState<FoodIntakeRecord[]>([]);  
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
            setFoodIntakeRecords(data);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Food Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Vitamins</TableCell>
                    <TableCell align="center">Amount&nbsp;(g)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {FoodIntakeRecords.map((record, index) => (
                    <TableRow key={index}>
                        <TableCell align="center">{record.date ? new Date(record.date).toLocaleDateString(): ''}</TableCell>
                        <TableCell align="center">{record.food.name}</TableCell>
                        <TableCell align="center">{record.food.category}</TableCell>
                        <TableCell align="center">
                            <ul>
                                {record.food.vitamins.map((vitamin, index) => (
                                    <li key={index}>
                                        {vitamin.name}: {vitamin.average} {vitamin.unit}
                                    </li>
                                ))}
                            </ul>
                        </TableCell>
                        <TableCell align="center">{record.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}
