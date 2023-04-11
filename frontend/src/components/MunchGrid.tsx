import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import React from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import visuallyHidden from '@mui/utils/visuallyHidden';
import MunchCard from './components/MunchCard';
import Grid from '@mui/material/Grid';

export interface TableFoodItem {
  item_name: string,
  restaurant_name: string,
  price: number,
  description: string,
}

export interface MunchCardItem {
    item_name: string,
    restaurant_name: string,
    price: number,
    description: string,
}

export interface MunchTableProps {
  rows: Array<TableFoodItem>
}

export interface MunchGridProps {
    cards: Array<MunchCardItem>
}

function MunchGrid(props: MunchGridProps): React.ReactElement {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof MunchCardItem>('item_name');
    const [cardsPerPage, setCardsPerPage] = React.useState(10);

    return (
        <Paper>
            <Box sx={{ flexGrow: 1}}>
                <Grid item xs>
                    <MunchCard>1</MunchCard>
                </Grid>
            </Box>
        </Paper>
    );
}


function MunchTable(props: MunchTableProps): React.ReactElement {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableFoodItem>('item_name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableFoodItem,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Paper>
      <TableContainer sx={{ flexGrow:1, flexShrink:1, height:"65vh", maxHeight: "65vh", width:"90vh",maxWidth:"90vh" }} component={Paper}>
        <Table stickyHeader style={{ flexGrow:1, flexShrink:1, width:"auto", tableLayout:"auto"}} aria-label="sticky table">
        <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          <TableBody>
          {stableSort(props.rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={"20%"} sx={{ height:75, maxHeight:75, minWidth:"20%", maxWidth:"20%" }} component="th" scope="row">{row.item_name}</TableCell>
                  <TableCell width={"15%"} sx={{ height:75, maxHeight:75, minWidth:"15%", maxWidth:"15%" }} align="left">{row.restaurant_name}</TableCell>
                  <TableCell width={"10%"} sx={{ height:75, maxHeight:75, minWidth:"10%", maxWidth:"10%" }} align="left">{row.price}</TableCell>
                  <TableCell width={"55%"} sx={{ height:75, maxHeight:75, minWidth:"55%", maxWidth:"55%" }} align="right">{row.description}</TableCell>
                </TableRow>
              );
            })}
            {/* TableRow height below is TableCell height + 33 to have a well aligned table */}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (108) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
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


function stableSort<T>(array:  Array<TableFoodItem>, comparator: (a: T, b: T) => number) {
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
  id: keyof TableFoodItem;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    disablePadding: false,
    id: 'item_name',
    numeric: false,
    label: 'Food Item',
  },
  {
    id: 'restaurant_name',
    numeric: false,
    disablePadding: false,
    label: 'Restaurant',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableFoodItem) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
     props;
  const createSortHandler =
    (property: keyof TableFoodItem) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MunchTable;