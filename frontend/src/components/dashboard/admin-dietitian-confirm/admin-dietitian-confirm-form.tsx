'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Check } from '@phosphor-icons/react';
import { X } from '@phosphor-icons/react';
import { PendingDietitian } from '@/types/PendingDietitian';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export function ConfirmDietitianForm(): React.JSX.Element {
    const token = localStorage.getItem('custom-auth-token');
    const [selectedDietitian, setSelectedDietitian] = React.useState<PendingDietitian | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogOpen2, setDialogOpen2] = React.useState(false);
    const [pendingDietitianList,setPendingDietitianList ] = React.useState<PendingDietitian[]>([]);

    const confirmDietitian = async (email: string) => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/admin/dietitian/confirm', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            
            if (!response.ok) {
                console.error('Failed to confirm dietitian:', response.statusText);
                return;
            }
            
            console.log('Dietitian confirmed successfully');
        } catch (error) {
            console.error('Error confirming dietitian:', error);
        }
    };


    const rejectDietitian = async (email: string) => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/admin/dietitian/reject', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            if (!response.ok) {
                console.error('Failed to retrieve list:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }

    const getDietitianList = async () =>{ 
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/admin/dietitian/list', {
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
            console.log(data)

            setPendingDietitianList(data)
            console.log('Pending List:', pendingDietitianList);
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    }

    const displayImage = (dietitianFileName: string) => {
        
        return (
            
            <iframe src={dietitianFileName} width="100%" height="500px" />
            
            );
    }

    const handleCheckButtonClick= (item: PendingDietitian) =>{
        setSelectedDietitian(item);
        setDialogOpen(true);
    }
    const handleCrossButtonClick= (item: PendingDietitian) =>{
        setSelectedDietitian(item);
        console.log(item.email)
        setDialogOpen2(true);
    }
    const handleDialogClose= () =>{
        setDialogOpen(false);
      }
      const handleDialogConfirm=(item: PendingDietitian) =>{
        console.log(item.email)
        confirmDietitian(item.email)
        window.location.reload();
        setDialogOpen(false);
      }

      const handleDialogClose2= () =>{
        setDialogOpen2(false);
      }
      const handleDialogConfirm2=(item: PendingDietitian) =>{
        //console.log(item.email)
        rejectDietitian(item.email)
        window.location.reload();
        setDialogOpen2(false);
      }

      React.useEffect(() => {
        getDietitianList();
    }, []);

    return (
        <>
            {pendingDietitianList.map((item: PendingDietitian) => (
                <Card key={item.fullname} sx={{ display: 'flex', marginBottom: '8px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {item.fullname}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Email: {item.email}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Diploma: {displayImage(item.dietitianFileName)}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCheckButtonClick(item)}>

                                <Check />
                            </IconButton>
                            <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCrossButtonClick(item)}>

                                <X />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            ))}
            
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title">
                    Confirmation
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Do you want to add this food item to the database?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button color="warning" autoFocus onClick={() => handleDialogConfirm(selectedDietitian!)}>
                        Confirm
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen2} onClose={handleDialogClose}>
                <DialogTitle sx={{ m: 0, p: 2, color:'#fa8805', bgcolor:'white'  }} id="customized-dialog-title2">
                    Confirmation
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>Do you want to delete this food item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" autoFocus onClick={handleDialogClose2}>
                        Cancel
                    </Button>
                    <Button color="warning" autoFocus onClick={() => handleDialogConfirm2(selectedDietitian!)}>
                        Delete
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
