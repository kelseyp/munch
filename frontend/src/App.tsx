import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { TableFoodItem } from './components/MunchTable';
import Drawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

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

export const mapFoodItemData = (foodItem: FoodItem): TableFoodItem => {
  return { 'item_name': foodItem.name, 'restaurant_name': foodItem.restaurant.name, 'price': foodItem.price, 'description': foodItem.description };
}

function App() {
  const [displayItems, setDisplayItems] = useState<FoodItem[]>([]);
  const [restaurantFilters, setRestaurantFilters] = useState<string[]>([]);
  const [currentRestaurantFilters, setCurrentRestaurantFilters] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001`).then((response: Response) => {
      response.json().then((json: any) => {
        const foodItems: FoodItem[] = JSON.parse(json) as FoodItem[];
        const restaurantNames = new Set<string>(foodItems.map((value: FoodItem) => { return value.restaurant.name; }))
        setRestaurantFilters(Array.from(restaurantNames).sort());
        setDisplayItems(foodItems);
      })
    });

  }, [])

  const handleSearchWordChange = (event: any) => {
    let searchWord = event.target.value;
    fetch(`http://localhost:3001/searchbar?keyword=${searchWord}`).then((response: Response) => {
      response.json().then((json: any) => {
        const foodItems: FoodItem[] = JSON.parse(json) as FoodItem[];
        const restaurantNames = new Set<string>(foodItems.map((value: FoodItem) => { return value.restaurant.name; }))
        setRestaurantFilters(Array.from(restaurantNames).sort());
        setDisplayItems(foodItems);
      })
    });
  }

  let handleCheckedBoxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setCurrentRestaurantFilters([...currentRestaurantFilters, event.target.name]);
    } else if (!checked) {
      setCurrentRestaurantFilters(currentRestaurantFilters.filter((value: string) => { return value !== event.target.name; }));
    }
  };

  let tableFoodItems: TableFoodItem[] = displayItems.map((value: FoodItem) => { return mapFoodItemData(value); });
  if (currentRestaurantFilters.length > 0) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return currentRestaurantFilters.indexOf(tableItem.restaurant_name) !== -1; });
  }

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MunchBox
          </Typography>
          <SearchBar searchCallback={handleSearchWordChange} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', pt: 2 }}>
          <Container>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Filters <FilterListIcon />
              <Divider />
              Restaurants
              <FormGroup>
                {restaurantFilters.map((value: string) => {
                  return <FormControlLabel label={value} key={value} control={<Checkbox onChange={handleCheckedBoxChange} name={value} />} />;
                })}
              </FormGroup>
              <Divider />
            </Typography>
          </Container>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: 1 / 1 }}>
        <Toolbar />
        <MunchTable rows={tableFoodItems} />
      </Box>
    </Box>
  );
}

export default App;
