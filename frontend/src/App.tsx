import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { TableFoodItem } from './components/MunchTable';
import Drawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';

type Restaurant = {
  name: string
  address: string
  description: string
}

type FoodItem = {
  id: number
  name: string
  price: number
  description: string
  restaurant: Restaurant
};

const mapFoodItemData = (foodItem: FoodItem): TableFoodItem => {
  return { 'item_name': foodItem.name, 'restaurant_name': foodItem.restaurant.name, 'price': foodItem.price, 'description': foodItem.description };
}

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])

  useEffect(() => {
    fetch(`http://localhost:3001`).then((response: Response) => {
      response.json().then((json: any) => {
        setFoodItems(JSON.parse(json));
      })
    });
  }, [])

  const handleSearchKeywordChange = (event: any) => {
    let keyword = event.target.value;
    fetch(`http://localhost:3001/searchbar?keyword=${keyword}`).then((response: Response) => {
      response.json().then((json: any) => {
        setFoodItems(JSON.parse(json));
      })
    });
  }

  const tableFoodItems: TableFoodItem[] = foodItems.map((value: FoodItem) => { return mapFoodItemData(value); })

  return (
    <Container sx={{ display: "flex", height: "99vh", width: "90vh" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MunchBox
          </Typography>
          <SearchBar searchCallback={handleSearchKeywordChange} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: '15%',
          flexShrink: 1,
          flexGrow: 1,
          [`& .MuiDrawer-paper`]: { width: '15%', minWidth: 150, maxWidth: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Grid item xs={12}>
            <Container>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Filters test <FilterListIcon />
              </Typography>
              Price : 
              <div>
              <TextField label="MIN" id="price_range" defaultValue="0.1" size="small" sx={{ m: 1, width: '8ch' }} />
              - 
              <TextField label="MAX" id="price_range" defaultValue="10.0" size="small" sx={{ m: 1, width: '8ch' }} />
              </div>

              <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="$0 - $5" /> 
                <FormControlLabel control={<Checkbox />} label="$5 - $10" /> 
                <FormControlLabel control={<Checkbox />} label="$10 above" /> 
              </FormGroup>

              </div>
            </Container>
          </Grid>
        </Box>
      </Drawer>
      <Box component="main">
        <Toolbar />
        <Toolbar />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container >
              <MunchTable rows={tableFoodItems} />
            </Container>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}

export default App;