'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PendingFood } from '@/types/PendingFood';
import { Check, X } from '@phosphor-icons/react';

export function ConfirmFoodForm(): React.JSX.Element {
    const token = localStorage.getItem('custom-auth-token');
    const [selectedFoodItem, setSelectedFoodItem] = React.useState<PendingFood | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [crossDialogOpen, setCrossDialogOpen] = React.useState(false);
    const [pendingList, setPendingList] = React.useState<PendingFood[]>([]);

    const confirmPendingFood = async (pendingFoodId: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/food/pending/confirm?pendingFoodId=${pendingFoodId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                return;
            }
        } catch (error) {
            console.error('Error confirming food:', error);
        }
    }

     const rejectPendingFood = async (pendingFoodId: number) => {
         try {
             const response = await fetch(`https://api.vitamis.hekolcu.com/food/pending/reject?pendingFoodId=${pendingFoodId}`, {
                 method: 'GET',
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 },
             });
             if (!response.ok) {
                 return;
             }
         } catch (error) {
             console.error('Error rejecting food:', error);
         }
    }

    const getPendingList = async () => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/food/pending/list', {
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
            const formattedList = data.map((item: { name: any; category: any; vitamins: any[]; foodId: any; }) => ({
                name: item.name,
                category: item.category,
                vitamins: item.vitamins.map(vitamin => ({
                    name: vitamin.name,
                    average: parseFloat(vitamin.average),
                    unit: vitamin.unit,
                    minimum: parseFloat(vitamin.minimum),
                    maximum: parseFloat(vitamin.maximum)
                })),
                foodId: item.foodId
            }));
            setPendingList(formattedList)
            console.log('Pending List:', formattedList);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }
    //Check
    const handleCheckButtonClick = (item: PendingFood) => {
        setSelectedFoodItem(item);
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogConfirm = (item: PendingFood) => {
        confirmPendingFood(item.foodId)
        window.location.reload();
        setDialogOpen(false);
    }
    //Cross
    const handleCrossButtonClick = (item: PendingFood) => {
        setSelectedFoodItem(item);
        setCrossDialogOpen(true);
    }
    const handleCrossDialogClose = () => {
        setCrossDialogOpen(false);
    }
    const handleCrossDialogConfirm = (item: PendingFood) => {
        rejectPendingFood(item.foodId)
        window.location.reload();
        setCrossDialogOpen(false);
    }
    React.useEffect(() => {
        getPendingList();
    }, []);

    return (
        <Grid container spacing={2} direction="row">
            {pendingList.map((item: PendingFood) => (
                <Grid xs={12} md={6} lg={6} key={item.name} component="div">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color={'#fa8805'}>
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" marginBottom={'10px'}>
                                Grup: {item.category}
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vitamin</TableCell>
                                            <TableCell align="right">Birim</TableCell>
                                            <TableCell align="right">Ortalama</TableCell>
                                            <TableCell align="right">En Düşük</TableCell>
                                            <TableCell align="right">En Yüksek</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {item.vitamins.map((vitamin, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {vitamin.name}
                                                </TableCell>
                                                <TableCell align="right">{vitamin.unit}</TableCell>
                                                <TableCell align="right">{vitamin.average}</TableCell>
                                                <TableCell align="right">{vitamin.minimum}</TableCell>
                                                <TableCell align="right">{vitamin.maximum}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <IconButton sx={{
                                fontSize: '2rem',
                                backgroundColor: 'orange',
                                border: '5px solid deepOrange',
                                m: 1,
                                p: 1,
                                ':hover': {
                                    backgroundColor: '#dcedc8',
                                },
                            }} aria-label="check" onClick={() => handleCheckButtonClick(item)}>
                                <Check color="primary" />
                            </IconButton>
                            <IconButton sx={{
                                fontSize: '2rem',
                                backgroundColor: 'orange',
                                border: '5px solid deepOrange',
                                m: 1,
                                p: 1,
                                ':hover': {
                                    backgroundColor: '#dcedc8',
                                },
                            }} aria-label="check" onClick={() => handleCrossButtonClick(item)}>
                                <X color="primary" />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Dialog open={dialogOpen} onClose={handleDialogClose} PaperProps={{
                style: {
                    padding: '20px',
                },
            }}>
                <DialogTitle id="customized-dialog-title">
                    Gıda Maddesi Detayları
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Bu gıda maddesini veritabanına eklemek istiyor musunuz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Grid container alignItems="center" justifyContent="space-between" width='100%'>
                        <Button
                            style={{ color: 'white', backgroundColor: '#ff9800' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d62828'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff9800'}
                            onClick={handleDialogClose}
                        >
                            Yoksay
                        </Button>
                        <Button style={{ color: 'white', backgroundColor: '#4caf50' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d6a4f'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
                            onClick={() => handleDialogConfirm(selectedFoodItem!)}
                        >
                            Onayla
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Dialog open={crossDialogOpen} onClose={handleCrossDialogClose} PaperProps={{
                style: {
                    padding: '20px',
                },
            }}>
                <DialogTitle id="customized-dialog-title">
                    Gıda Maddesi Detayları
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Bu gıda maddesi önerisini silmek istiyor musunuz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Grid container alignItems="center" justifyContent="space-between" width='100%'>
                        <Button
                            style={{ color: 'white', backgroundColor: '#ff9800' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d62828'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff9800'}
                            onClick={handleCrossDialogClose}
                        >
                            Yoksay
                        </Button>
                        <Button style={{ color: 'white', backgroundColor: '#4caf50' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d6a4f'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
                            onClick={() => handleCrossDialogConfirm(selectedFoodItem!)}
                        >
                            Sil
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>

    );
}
