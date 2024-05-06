'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export interface FoodIntake {
  foodIntakeId: number;
  userId: number;
  foodId: number;
  food: {
    name: string;
    category: string;
    vitamins: Array<{
      name: string;
      average: string;
      unit: string;
      minimum: string | null;
      maximum: string | null;
    }>;
    foodId: number;
  };
  amount: number;
  date: string;
}

export interface FoodIntakeHistoryProps {
  sx?: SxProps;
}

export function FoodIntakeHistory({ sx }: FoodIntakeHistoryProps): React.JSX.Element {
  const [foodIntakes, setFoodIntakes] = useState<FoodIntake[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const token = localStorage.getItem('custom-auth-token');
    fetch('https://api.vitamis.hekolcu.com/tracking/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        const arr = Array.from<FoodIntake>(data);
        const multipliedData = arr.flatMap(item => Array(1).fill(item));

        // sort the data by date
        multipliedData.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          }
          return 0;
        });

        setFoodIntakes(multipliedData);

        if (multipliedData.length < rowsPerPage) {
          setRowsPerPage(multipliedData.length);
          setPage(0);
        }
      });
  }, []);

  const titleStyle: React.CSSProperties | undefined = { color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold', whiteSpace: 'nowrap' };

  return (
    <Card sx={sx}>
      <CardHeader title="Yediğim Yiyecekler" />
      <Divider />
      <Box sx={{ overflowX: 'auto', display: 'grid', gridTemplateRows: '1fr auto' }}>
        <TableContainer style={{ borderRadius: '0px 0px 20px 20px' }} component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell style={titleStyle}>Yiyecek</TableCell>
                <TableCell style={titleStyle}>Grup</TableCell>
                <TableCell align='right' style={titleStyle}>Miktar (gr)</TableCell>
                <TableCell align='right' style={titleStyle}>Tarih</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodIntakes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((intake) => (
                <TableRow hover key={intake.foodIntakeId}>
                  <TableCell>{intake.food.name}</TableCell>
                  <TableCell>{intake.food.category}</TableCell>
                  <TableCell align='right'>{intake.amount}</TableCell>
                  <TableCell align='right'>{dayjs(intake.date).locale('tr').format('MMM D, YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={foodIntakes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
}
