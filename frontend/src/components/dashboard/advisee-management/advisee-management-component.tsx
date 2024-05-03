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
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PendingFood } from '@/types/PendingFood';
import Divider from '@mui/material/Divider';
import { Check } from '@phosphor-icons/react';
import { X } from '@phosphor-icons/react';
import { UserSearchItem } from '@/types/UserSearchItem';
import { AdviseeUser } from '@/types/AdviseeUser';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export function AdviseeManagement(): React.JSX.Element {
    const token = localStorage.getItem('custom-auth-token');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<UserSearchItem[] | null>(null);
    const [selectedUser, setSelectedUser] = React.useState<UserSearchItem | null>(null);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [adviseeList, setAdviseeList] = React.useState<AdviseeUser[]>([]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    };

    
    const addAdvisee = async (userId: number) => {
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/dietitian/advisee/add', {
                method: 'POST',
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

    const handleSearch = async () => {
        try {
          const response = await fetch(`https://api.vitamis.hekolcu.com/user/search?q=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            });
          const data = await response.json();
          setSearchResults(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

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

    const handleCheckButtonClick= (item: UserSearchItem) =>{
        setSelectedUser(item);
        setDialogOpen(true);
    }

    const handleDialogClose= () =>{
        setDialogOpen(false);
      }
      const handleDialogConfirm=(item: UserSearchItem) =>{
        //
        console.log(item.email)
        //window.location.reload();
        setDialogOpen(false);
      }

      React.useEffect(() => {
        //getPendingList();

    }, []);

    return (
        <>
        <Box display="flex" justifyContent="center">
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="sign-up form tabs">
            <Tab label="My Advisees" />
            <Tab label="Add New Avisee" />
          </Tabs>
          </Box>
          {tabIndex === 1 && (
            <Grid container spacing={3} direction="column" alignItems="center">
              <Grid xs={12} lg={8} md={8}>
                <TextField
                  fullWidth
                  label="Search Food"
                  variant="outlined"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  Search
                </Button>
              </Grid>
            </Grid>
          )}
      
      {tabIndex === 1 && searchResults !== null ? (
      searchResults.length > 0 ? (
        searchResults.map((item, index) => (
          <Card key={index} sx={{ display: 'flex', marginBottom: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {item.fullname}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Email: {item.email}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCheckButtonClick(item)}>
                  <Check />
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography marginTop={5} align="center" variant="body1">No user was found</Typography>
      )
    ) : null}
      
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }} id="customized-dialog-title">
              Confirmation
            </DialogTitle>
            <DialogContent dividers>
              <Typography>Do you want to add user as your advisee?</Typography>
            </DialogContent>
            <DialogActions>
              <Button color="warning" autoFocus onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button color="warning" autoFocus onClick={() => handleDialogConfirm(selectedUser!)}>
                Confirm
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      );
}
