import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { FoodItem } from './components/MunchTable';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


interface Data {
  item_name: string;
  restaurant_name: string;
  price: number;
  description: string;
}

function createData(
  item_name: string,
  restaurant_name: string,
  price: number,
  description: string,
): FoodItem {
  return { item_name, restaurant_name, price, description };
}

const rows: Array<FoodItem> = [
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
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
  createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
  createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
  createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
];

function App() {
  /*
  function createData(
    item_name: string,
    restaurant_name: string,
    price: number,
    description: string,
  ): FoodItem {
    return { item_name, restaurant_name, price, description };
  }

  const rows: Array<FoodItem> = [
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
    createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
    createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
    createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
    createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
    createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
    createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
    createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
    createData('Frozen yoghurt', 'Froyo Heaven', 6.0, ' Like ice-cream, but worse!'),
    createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
    createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
    createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
    createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
    createData('Ice cream sandwich', 'YumYums', 9.0, 'Ice-cream between crackers?'),
    createData('Eclair', 'Fine Desserts', 16.0, 'No clue, good luck'),
    createData('Cupcake', 'Best Bakery', 3.7, 'A cake you can feel better about eating'),
    createData('Gingerbread', 'Gingy', 16.0, 'Made down on Drury Lane'),
  ];
*/
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
            <MunchTable rows={rows} />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'item_name',
    numeric: false,
    disablePadding: true,
    label: 'Food',
  },
  {
    id: 'restaurant_name',
    numeric: true,
    disablePadding: false,
    label: 'Restaurant',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Food Sescription',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
/*
export default function EnhancedTable() {
  
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('item_name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.item_name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

}
*/