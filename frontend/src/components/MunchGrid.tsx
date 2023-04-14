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
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface MunchCardItem {
    item_name: string,
    restaurant_name: string,
    price: number,
    description: string,
}
export interface MunchGridProps {
    cards: Array<MunchCardItem>
}

function MunchGrid(props: MunchGridProps): React.ReactElement {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof MunchCardItem>('item_name');
    const [page, setPage] = React.useState(0);
    const [cardsPerPage, setCardsPerPage] = React.useState(10);
    const [cardsPerRow, setCardsPerRow] = React.useState(3);

    return (
        <Paper>
            <Box sx={{ flexGrow: 1}}>
            {stableSort(props.cards, getComparator(order, orderBy)).slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map((card, index) => {
              return (
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="{card.item_name}"
                  />
                <CardContent>
                  
                  <Typography gutterBottom variant="h5" component="div">
                    {card.item_name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.price}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.restaurant_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>

                </CardContent>
              </Card>
              );
            })}
            </Box>
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


function stableSort<T>(array:  Array<MunchCardItem>, comparator: (a: T, b: T) => number) {
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

export default MunchGrid;