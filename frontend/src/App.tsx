import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
import { TableView } from '@mui/icons-material';


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
  const [showTable, setShowTable] = useState<string>("show");
  const [pageView, setPageView] = React.useState<string | null>('table');

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

  const handlePageView = (
    event: React.MouseEvent<HTMLElement>,
    newPageView: string | null,
  ) => {
    setPageView(newPageView);
    if(newPageView === "table") {
      setShowTable("show");
    } else {
      setShowTable("none");
    }
  };

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
                Filters <FilterListIcon />
              </Typography>
            </Container>
          </Grid>
        </Box>
      </Drawer>
      <Box component="main">
        <Toolbar />
        <Toolbar />
        <ToggleButtonGroup
          orientation="horizontal"
          value={pageView}
          exclusive
          onChange={handlePageView}
        >
          <ToggleButton value="table" aria-label="table" >
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <MunchTable rows={tableFoodItems} show={showTable} />
      </Box>

    </Container>
  );
}

export default App;