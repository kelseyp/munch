import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { TableFoodItem, Order } from './components/MunchTable';
import Drawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { FormControlLabel, Checkbox, FormGroup, Radio, RadioGroup } from '@mui/material';


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
  const [showTable, setShowTable] = useState<string>("show");
  const [pageView, setPageView] = React.useState<string | null>('table');
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableFoodItem>('item_name');
  const [priceFilterValue, setPriceFilterValue] = React.useState<number>(0);

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

  const handlePageView = (
    event: React.MouseEvent<HTMLElement>,
    newPageView: string | null,
  ) => {
    setPageView(newPageView);
    if (newPageView === "table") {
      setShowTable("show");
    } else {
      setShowTable("none");
    }
  };

  let handleCheckedBoxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setCurrentRestaurantFilters([...currentRestaurantFilters, event.target.name]);
    } else if (!checked) {
      setCurrentRestaurantFilters(currentRestaurantFilters.filter((value: string) => { return value !== event.target.name; }));
    }
  };

  let handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderBy((event.target as HTMLInputElement).value as keyof TableFoodItem);
    setOrder('asc');
  };

  let handleSortTableChange = (order: Order, orderBy: keyof TableFoodItem) => {
    setOrderBy(orderBy);
    setOrder(order);
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilterValue(parseInt(event.target.value, 10));
  };

  let tableFoodItems: TableFoodItem[] = displayItems.map((value: FoodItem) => { return mapFoodItemData(value); });
  // Three price cases: value =0 is default case(full table), value=5 - want all items less than 5, value=10 - want all items less than 10 but greater than 5
  // Using >= so that $5.00 and $10.00 items are included, not excluded.
  if ((priceFilterValue === 5)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return priceFilterValue >= tableItem.price; })
  } else if ((priceFilterValue === 10) ) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 5)); })
  }

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
              Price
              <RadioGroup
                aria-labelledby="price-radio-button-group"
                name="price-radio-button-group"
                value={priceFilterValue}
                onChange={handlePriceFilterChange}
              >
                <FormControlLabel value={0} control={<Radio />} label="Show All" />
                <FormControlLabel value={5} control={<Radio />} label="$0 - $5" />
                <FormControlLabel value={10} control={<Radio />} label="$5 - $10" />
              </RadioGroup>
              <Divider />
              Sort By
              <RadioGroup
                aria-labelledby="sort-by-radio-button-group"
                defaultValue="item_name"
                name="radio-buttons-group"
                value={orderBy}
                onChange={handleSortByChange}
              >
                <FormControlLabel value="item_name" control={<Radio />} label="Food Item" />
                <FormControlLabel value="restaurant_name" control={<Radio />} label="Restaurant" />
                <FormControlLabel value="price" control={<Radio />} label="Price" />
                <FormControlLabel value="description" control={<Radio />} label="Description" />
              </RadioGroup>
              <Divider />
            </Typography>
          </Container>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: 1 / 1 }}>
        <Toolbar />
        <ToggleButtonGroup
          orientation="horizontal"
          size="small"
          value={pageView}
          exclusive
          onChange={handlePageView}
          sx={{ pb: 2 }}
        >
          <ToggleButton value="table" aria-label="table" >
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <MunchTable rows={tableFoodItems} show={showTable} order={order} orderBy={orderBy} sortCallback={handleSortTableChange} />
      </Box>
    </Box>
  );
}

export default App;
