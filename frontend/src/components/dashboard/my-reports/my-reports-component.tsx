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
import { FoodIntakeReport } from '@/types/FoodIntakeReport';
import { CardContent, CardHeader } from '@mui/material';

export function ViewReport() {
    const token = localStorage.getItem('custom-auth-token');
    const [FoodIntakeReports, setFoodIntakeReport] = React.useState<FoodIntakeReport[]>([]);

    const [FoodIntakeRecords, setFoodIntakeRecords] = React.useState<FoodIntakeRecord[]>([]);  
    const getList = async () => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/tracking/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                
            });
            if (!response.ok) {
                console.error('Failed to retrieve list:', response.statusText);
                return;
            }
            const data = await response.json();
            console.log('List:', data);
            setFoodIntakeRecords(data);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    };

    const generateReport = async () => {
        try {
            const currentDate = new Date();
            const reportDataArray = [];
    
            // Loop through the past seven days
            for (let i = 0; i < 7; i++) {
                // Set start date to 00:00:00.000 of the current day
                const startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - i);
                startDate.setHours(0, 0, 0, 0);
    
                // Set end date to 23:59:59.999 of the current day
                const endDate = new Date(startDate);
                endDate.setHours(23, 59, 59, 999);
    
                console.log('Start Date:', startDate);
                console.log('End Date:', endDate);
    
                reportDataArray.push(await fetchReport(startDate, endDate));
            }
    
            // Set the report data array
            setFoodIntakeReport(reportDataArray);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };
    
    const fetchReport = async (startDate: Date, endDate: Date) => {
        try {
            const requestBody = {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            };
    
            const response = await fetch('https://api.vitamis.hekolcu.com/report/generate/mock', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                console.error('Failed to generate report:', response.statusText);
                return null;
            }
    
            const reportData = await response.json();
            console.log('Report generated for', startDate.toLocaleDateString(), ':', reportData);
            return reportData;
        } catch (error) {
            console.error('Error generating report:', error);
            return null;
        }
    };

    useEffect(() => {
        getList();
        generateReport();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={<Typography variant="h5" color={'#FFFFF'} align='center'>Weekly Report</Typography>}/>
                    <CardContent>
                <TableContainer component={Paper}>
                
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Vitamin Summary</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {FoodIntakeReports.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{record.startDate ? new Date(record.startDate).toLocaleDateString() : ''}</TableCell>
                                    <TableCell align="center">
                                        <ul>
                                            {record.vitaminSummaries.map((vitamin, index) => (
                                                <li key={index}>
                                                    {vitamin.name}: {vitamin.totalAmount?.toFixed(3)} {vitamin.unit}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={<Typography variant="h5" color={'#FFFFF'} align='center'>Entered Meals</Typography>}/>
                    <CardContent>
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
                                    <TableCell align="center">{record.date ? new Date(record.date).toLocaleDateString() : ''}</TableCell>
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
                </CardContent>
                </Card>
            </Grid>
        </Grid>
        
    );
}
