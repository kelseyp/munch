import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TablePagination from '@mui/material/TablePagination';
import React from 'react';

function createData(
  item_name: string,
  restaurant_name: string,
  price: number,
  description: string,
) {
  return { item_name, restaurant_name, price, description };
}

const rows = [
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
];

function App() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Munch
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Food Item</TableCell>
                    <TableCell align="right">Restaurant</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        key={row.item_name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.item_name}
                        </TableCell>
                        <TableCell align="right">{row.restaurant_name}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                      </TableRow>
                    );
                  })}

                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
