"use client";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination, Card, CardHeader } from '@mui/material';
import Paper from '@mui/material/Paper';
import { VitaminRecommendation, getRecommendations } from '../../../lib/auth/auth-utils';

function VitaminRefTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [products, setProducts] = useState<{
    groupName: string;
    recommendedVitamins: VitaminRecommendation[];
  } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getRecommendations(localStorage.getItem('custom-auth-token') as string);
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
    <Card>
      <CardHeader title='Önerilen Vitaminler' />
      <Paper>
        <TableContainer style={{ borderRadius: '0px 0px 20px 20px' }}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Vitamin</TableCell>
                <TableCell align='right' style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Miktar</TableCell>
                <TableCell align='right' style={{ color: 'white', backgroundColor: '#fb9c0c', fontSize: '16px', fontWeight: 'bold' }}>Birim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.recommendedVitamins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{product.vitaminName}</TableCell>
                  <TableCell align='right'>{product.amount}</TableCell>
                  <TableCell align='right'>{product.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products?.recommendedVitamins.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Items'
        />
      </Paper>
    </Card>
  );
}

export default VitaminRefTable;
