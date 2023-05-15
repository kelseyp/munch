import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import visuallyHidden from '@mui/utils/visuallyHidden';

import { MunchItem } from './MunchItem';
import { Order } from '../domain/utils';

export interface MunchTableProps {
  rows: Array<MunchItem>,
  show: string,
  order: Order,
  orderBy: keyof MunchItem,
  sortCallback: ((order: Order, orderBy: keyof MunchItem) => void);
}

export function MunchTable(props: MunchTableProps): React.ReactElement {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MunchItem,
  ) => {
    const isAsc = props.orderBy === property && props.order === 'asc';
    props.sortCallback((isAsc ? 'desc' : 'asc'), property)
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeight: string = "calc(100vh - 220px)";

  return (
    <Paper sx={{ display: props.show }} >
      <TableContainer component={Paper} sx={{ flexGrow: 1, flexShrink: 1, height: tableHeight }}>
        <Table stickyHeader aria-label="sticky table" style={{ flexGrow: 1, flexShrink: 1, width: "100%", tableLayout: "auto" }}>
          <EnhancedTableHead
            order={props.order}
            orderBy={props.orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={"20%"} component="th" scope="row">{row.name}</TableCell>
                  <TableCell width={"15%"} align="left">{row.restaurant.name}</TableCell>
                  <TableCell width={"10%"} align="right">${row.price.toFixed(2)}</TableCell>
                  <TableCell width={"55%"} align="left">{row.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof MunchItem;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    disablePadding: false,
    id: 'name',
    numeric: false,
    label: 'Food Item',
  },
  {
    id: 'restaurant',
    numeric: false,
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
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
];

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MunchItem) => void;
  order: Order;
  orderBy: string;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  
  const createSortHandler = (property: keyof MunchItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{fontWeight:'bold'}}
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
