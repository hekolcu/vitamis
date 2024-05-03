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
import { Box, Dialog, DialogActions, DialogProps, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography, styled, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PendingFood } from '@/types/PendingFood';
import Divider from '@mui/material/Divider';
import { Check, Cross } from '@phosphor-icons/react';
import { X } from '@phosphor-icons/react';
import { UserSearchItem } from '@/types/UserSearchItem';
import { AdviseeUser } from '@/types/AdviseeUser';
import { NewspaperClipping } from '@phosphor-icons/react';
import { DailyReport } from '@/types/DailyReport';


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
    const [dialogOpen2, setDialogOpen2] = React.useState(false);
    const [dialogOpenReport, setDialogOpenReport] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<UserSearchItem[] | null>(null);
    const [selectedUser, setSelectedUser] = React.useState<UserSearchItem | null>(null);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [adviseeList, setAdviseeList] = React.useState<AdviseeUser[]>([]);
    const [selectedAdvisee, setSelectedAdvisee] = React.useState<AdviseeUser>();
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [dailyReport, setDailyReport] = React.useState<DailyReport[]>([]);

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
                body: JSON.stringify({ userId: userId })
            });
            if (!response.ok) {
                return;
            }
        } catch (error) {
            console.error('Error adding user:', error);
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


    const getAdviseeList = async () =>{
        try {
            const response = await fetch('https://api.vitamis.hekolcu.com/dietitian/advisee/list', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json'
              },
              });
            const data = await response.json();
            setAdviseeList(data);
            console.log(data);
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
    };

    const removeAdvisee = async (userId: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/dietitian/advisee/remove?userId=${userId}`, {
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
            console.error('Error removing advisee:', error);
        }
    };

    const getDailyReport = async (userId: number) => {
        try {
            const response = await fetch(`https://api.vitamis.hekolcu.com/dietitian/advisee/dailyReport?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setDailyReport(data);
            console.log(data);
            
            if (!response.ok) {
                return;
            }
        } catch (error) {
            console.error('Günlük rapora erişilemedi:', error);
        }
    };

    const handleCheckButtonClick= (item: UserSearchItem) =>{
        setSelectedUser(item);
        setDialogOpen(true);
    }
    const handleCrossButtonClick= (item: AdviseeUser) =>{
        setSelectedAdvisee(item);
        console.log(item.userId)
        setDialogOpen2(true);
    }
    const handleDialogClose= () =>{
        setDialogOpen(false);
      }
      const handleDialogClose2= () =>{
        setDialogOpen2(false);
      }
      const handleDialogConfirm=(item: UserSearchItem) =>{
        addAdvisee(item.userId)
        console.log(item.email)
        window.location.reload();
        setDialogOpen(false);
      }
      const handleDialogConfirm2=(item: AdviseeUser) =>{
        console.log(item.userId)
        removeAdvisee(item.userId)
        window.location.reload();
        setDialogOpen2(false);
      }

      const handleReportButton= (item: AdviseeUser) => {
        getDailyReport(item.userId);
        setDialogOpenReport(true);
        setScroll("paper");
      }
      const handleDialogCloseReport= () =>{
        setDailyReport([]);
        setDialogOpenReport(false);
      }
      React.useEffect(() => {
        getAdviseeList();

    }, []);

    return (
        <>
        <Box display="flex" justifyContent="center">
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="sign-up form tabs">
            <Tab label="Danışanlarım" />
            <Tab label="Yeni Danışan Ekle" />
          </Tabs>
          </Box>
          {tabIndex === 0 ? (
      adviseeList.length > 0 ? (
        adviseeList.map((item, index) => (
          <Card key={index} sx={{ display: 'flex', marginBottom: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {item.fullname}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="check" className="checkmark-button" onClick={() => handleCrossButtonClick(item)}>
                  <X />
                </IconButton>
                <IconButton aria-label="check" className="checkmark-button" onClick={() => handleReportButton(item)}>
                  <NewspaperClipping/>
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography marginTop={5} align="center" variant="body1">Kullanıcı Bulunamadı</Typography>
      )
    ) : null}
          {tabIndex === 1 && (
            <Grid container spacing={3} direction="column" alignItems="center">
              <Grid xs={12} lg={8} md={8}>
                <TextField
                  fullWidth
                  label="Kullanıcı Ara"
                  variant="outlined"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  Ara
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
        <Typography marginTop={5} align="center" variant="body1">Arama kriterlerine uyan bir kullanıcı bulunamadı</Typography>
      )
    ) : null}
      
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen2} onClose={handleDialogClose2}>
            <DialogTitle sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }} id="customized-dialog-title">
              Confirmation
            </DialogTitle>
            <DialogContent dividers>
              <Typography>Bu danışmanı kaldırmak istiyor musunuz?</Typography>
            </DialogContent>
            <DialogActions>
              <Button color="warning" autoFocus onClick={handleDialogClose2}>
                Cancel
              </Button>
              <Button color="warning" autoFocus onClick={() => handleDialogConfirm2(selectedAdvisee!)}>
                Confirm
              </Button>
            </DialogActions>
          </BootstrapDialog>
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }} id="customized-dialog-title">
              Confirmation
            </DialogTitle>
            <DialogContent dividers>
              <Typography>Bu kullanıcıyı danışman olarak eklemek istiyor musunuz?</Typography>
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
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={dialogOpenReport} onClose={handleDialogCloseReport} >
            <DialogTitle sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }} id="customized-dialog-title">
              Günlük Rapor
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
            {dailyReport === null ? (
                <Typography marginTop={5} align="center" variant="body1">Günlük rapor bulunamadı</Typography>
            ) : Array.isArray(dailyReport) && dailyReport.length > 0 ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vitamin Adı</TableCell>
                            <TableCell>Tüketilen Miktar</TableCell>
                            <TableCell>Önerilen Miktar</TableCell>
                            <TableCell>Yüzdelik Miktar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dailyReport.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.vitaminName}</TableCell>
                                <TableCell>{item.consumedAmount}</TableCell>
                                <TableCell>{item.recommendedAmount}</TableCell>
                                <TableCell>{item.percentage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography marginTop={5} align="center" variant="body1">Günlük rapor bulunamadı</Typography>
            )}
            </DialogContent>
            <DialogActions>
              <Button color="warning" autoFocus onClick={handleDialogCloseReport}>
                Kapat
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      );
}
