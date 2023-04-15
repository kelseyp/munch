import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { TableFoodItem } from './components/MunchTable';
import Drawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {FilterTheDamnTable} from './components/TableFilters';
import {RestaurantCheckboxes} from './components/TableFilters';

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
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001`).then((response: Response) => {
      response.json().then((json: any) => {
        setFoodItems(JSON.parse(json));
      })
    });
  }, [])

  const handleSearchWordChange = (event: any) => {
    let searchWord = event.target.value;
    fetch(`http://localhost:3001/searchbar?keyword=${searchWord}`).then((response: Response) => {
      response.json().then((json: any) => {
        setFoodItems(JSON.parse(json));
      })
    });
  }

  const handleCheckedBoxChange = (event: any) => {
    let searchWord = event.target.value;
    fetch(`http://localhost:3001/searchbar?keyword=${searchWord}`).then((response: Response) => {
      response.json().then((json: any) => {
        setFoodItems(JSON.parse(json));
      })
    });
  }

  ///const tableFoodItems: TableFoodItem[] = foodItems.map((value: FoodItem) => { return mapFoodItemData(value); })
  let tableFoodItems: TableFoodItem[] = foodItems.map((value: FoodItem) => { return mapFoodItemData(value); });
  //const filteredDataForRestaurant = tableFoodItems.map(item => item.restaurant_name).filter((value, index, self) => self.indexOf(value) === index)
  //const anyCheckedBoxes = [true, false];
  //console.log(tableFoodItems)
  let somethingNew: TableFoodItem[] = [];
  somethingNew.push(tableFoodItems[0]);
  const trialArray = ["Pizza 3.14" ];
  //let trialFilter = tableFoodItems.filter(name => name.restaurant_name.toString() === trialArray.toString())



  // Filters the tableFoodItems to see if any restaurant names match a name in trialArray
  let trialFilter = tableFoodItems.filter(name => trialArray.includes(name.restaurant_name))
  //console.log(trialFilter);
  //console.log(trialArray.toString())
  //tableFoodItems = FilterTheDamnTable(tableFoodItems);

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
          <SearchBar searchCallback={handleSearchWordChange} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          width: '15%',
          flexShrink: 1,
          flexGrow: 1,
          [`& .MuiDrawer-paper`]: { width: '15%', minWidth: 150, maxWidth: 240, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <List>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Filters <FilterListIcon />
            <Divider />
            Restaurants
            {/* <RestaurantCheckboxes items={foodItems} tableData={tableFoodItems} filteredData={filteredDataForRestaurant} /> */}
            <RestaurantCheckboxes checkedCallback={handleCheckedBoxChange} items={foodItems} tableData={tableFoodItems} />
            <Divider />
          </Typography>
        </List>
      </Drawer>
      <Box component="main">
        <Toolbar />
        <Toolbar />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container >
              <MunchTable rows={FilterTheDamnTable(tableFoodItems)} />
            </Container>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}

export default App;



{/* <Drawer
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
                Filters <FilterListIcon />
              </Typography>
            </Container>
          </Grid>
        </Box>
        <Box>
          <Grid item xs={12}>
            <Container>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                Restuarants
                </Typography>
              <RestaurantCheckboxes/>
            </Container>
          </Grid>
        </Box>
      </Drawer> */}