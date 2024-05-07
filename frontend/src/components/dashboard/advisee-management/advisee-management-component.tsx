'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Dialog, DialogActions, DialogProps, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography, styled, Table, TableHead, TableCell, TableRow, TableBody, CardActions } from '@mui/material';
import { Check } from '@phosphor-icons/react';
import { UserSearchItem } from '@/types/UserSearchItem';
import { AdviseeUser } from '@/types/AdviseeUser';
import { NewspaperClipping } from '@phosphor-icons/react';
import { UserMinus } from '@phosphor-icons/react';
import { PlusCircle } from '@phosphor-icons/react';
import { DailyReport } from '@/types/DailyReport';

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

  const getAdviseeList = async () => {
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

  const handleCheckButtonClick = (item: UserSearchItem) => {
    setSelectedUser(item);
    setDialogOpen(true);
  }

  const handleCrossButtonClick = (item: AdviseeUser) => {
    setSelectedAdvisee(item);
    console.log(item.userId)
    setDialogOpen2(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleDialogClose2 = () => {
    setDialogOpen2(false);
  }

  const handleDialogConfirm = (item: UserSearchItem) => {
    addAdvisee(item.userId)
    console.log(item.email)
    window.location.reload();
    setDialogOpen(false);
  }

  const handleDialogConfirm2 = (item: AdviseeUser) => {
    console.log(item.userId)
    removeAdvisee(item.userId)
    window.location.reload();
    setDialogOpen2(false);
  }

  const handleReportButton = (item: AdviseeUser) => {
    getDailyReport(item.userId);
    setDialogOpenReport(true);
    setScroll("paper");
  }

  const handleDialogCloseReport = () => {
    setDailyReport([]);
    setDialogOpenReport(false);
  }

  React.useEffect(() => {
    getAdviseeList();

  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="sign-up form tabs">
          <Tab label="Danışanlarım" />
          <Tab label="Yeni Danışan Ekle" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: '10px' }}>
          {adviseeList.length > 0 ? adviseeList.map((item, index) => (
            <Grid xs={12} lg={6} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <CardContent>
                  <Typography variant="h5">{item.fullname}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton color="primary" onClick={() => handleReportButton(item)}>
                    <NewspaperClipping />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleCrossButtonClick(item)}>
                    <UserMinus />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )) : <Typography marginTop={5} align="center" variant="body1">Kullanıcı Bulunamadı</Typography>}
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid container spacing={3} direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: '10px' }}>
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
      {tabIndex === 1 && (
        <Grid container spacing={3} justifyContent="center">
          {searchResults !== null ? (
            searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <Grid xs={12} sm={6} lg={6} key={index}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div">{item.fullname}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{`Email: ${item.email}`}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                      <IconButton color="primary" onClick={() => handleCheckButtonClick(item)}>
                        <PlusCircle />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography marginTop={5} align="center" variant="body1">Arama kriterlerine uyan bir kullanıcı bulunamadı</Typography>
            )
          ) : null}
        </Grid>
      )}

      <Dialog open={dialogOpen2} onClose={handleDialogClose2} PaperProps={{
        style: {
          padding: '20px',
        },
      }}>
        <DialogTitle id="customized-dialog-title">
          Bu danışmanı kaldırmak istiyor musunuz?
        </DialogTitle>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="space-between" width='100%'>
            <Button
              style={{ color: 'white', backgroundColor: '#ff9800' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d62828'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff9800'}
              onClick={handleDialogClose2}
            >
              Yoksay
            </Button>
            <Button style={{ color: 'white', backgroundColor: '#4caf50' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d6a4f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
              onClick={() => handleDialogConfirm2(selectedAdvisee!)}
            >
              Onayla
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose} PaperProps={{
        style: {
          padding: '20px',
        },
      }}>
        <DialogTitle id="customized-dialog-title">
          Bu kullanıcıyı danışman olarak eklemek istiyor musunuz?
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{selectedUser ? selectedUser.fullname : ''}</Typography>
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
              onClick={() => handleDialogConfirm(selectedUser!)}
            >
              Onayla
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogOpenReport}
        onClose={handleDialogCloseReport}
        aria-labelledby="customized-dialog-title"
        PaperProps={{
          style: {
            padding: '20px',
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: '#fa8805', bgcolor: 'white' }}
          id="customized-dialog-title"
        >
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
                    <TableCell>{item.consumedAmount.toFixed(2)}</TableCell>
                    <TableCell>{item.recommendedAmount}</TableCell>
                    <TableCell>%{item.percentage.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography marginTop={5} align="center" variant="body1">Günlük rapor bulunamadı</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            onClick={handleDialogCloseReport}
            style={{ color: 'white', backgroundColor: '#ff9800' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d62828'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff9800'}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
