'use client';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

            for (let i = 0; i < 7; i++) {
                const startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - i);
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(startDate);
                endDate.setHours(23, 59, 59, 999);

                console.log('Start Date:', startDate);
                console.log('End Date:', endDate);

                reportDataArray.push(await fetchReport(startDate, endDate));
            }

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Haftalık rapor" />
                <Tab label="Yediğim Yiyecekler" />
            </Tabs>
            {value === 0 && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title={<Typography variant="h5" color={'#FFFFF'} align='center'>Haftalık rapor</Typography>} />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Tarih</TableCell>
                                                <TableCell align="center" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Vitamin Özeti</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {FoodIntakeReports.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{record && record.startDate ? new Date(record.startDate).toLocaleDateString() : ''}</TableCell>
                                                    <TableCell align="left">
                                                        <Table size='small'>
                                                            <TableBody>
                                                                {record && record.vitaminSummaries && record.vitaminSummaries.map((vitamin, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell><b>{vitamin.name}:</b></TableCell>
                                                                        <TableCell>{vitamin.totalAmount?.toFixed(3)} {vitamin.unit}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
            {value === 1 && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title={<Typography variant="h5" color={'#FFFFF'} align='center'>Yediğim Yiyecekler</Typography>} />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Tarih</TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Yemek</TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Kategori</TableCell>
                                                <TableCell align="center" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Vitaminler</TableCell>
                                                <TableCell align="right" style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Miktar&nbsp;(g)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {FoodIntakeRecords.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{record.date ? new Date(record.date).toLocaleDateString() : ''}</TableCell>
                                                    <TableCell align="left">{record.food.name}</TableCell>
                                                    <TableCell align="left">{record.food.category}</TableCell>
                                                    <TableCell>
                                                        <Table size='small'>
                                                            <TableBody>
                                                                {record.food.vitamins.map((vitamin, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell><b>{vitamin.name}:</b></TableCell>
                                                                        <TableCell>{vitamin.average} {vitamin.unit}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                    <TableCell align="right">{record.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}
