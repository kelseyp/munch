import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { FoodItem } from './components/MunchTable';

function App() {
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

export default App;
