import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MunchTable, { FoodItem } from './components/MunchTable';
import Drawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getDBData } from './GetData';
import { useEffect, useState } from 'react';
import React from 'react';
//import data from './dbData.json';
//import getDBData from './GetData.js';



function App() {
  function createData(
    item_name: string,
    restaurant_name: string,
    price: number,
    description: string,
  ): FoodItem {
    return { item_name, restaurant_name, price, description };
  }


  const [items, setItems] = React.useState<FoodItem[]>([]);
  useEffect(() => {
    let restaurant: string = '';
    getDBData().then((jsonData) => {
      const rows: Array<FoodItem> = [];
      for (let item of jsonData) {
        if (item.resturantID === '1') {
          restaurant = 'Lighthouse Cafe';
        } else if (item.resturantID === '2') {
          restaurant = 'Pizza 3.14';
        }
        rows.push(createData(item.name, restaurant, Number(item.price), item.description))
      }
      setItems(rows);
    });

  });


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box>
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
      <Toolbar />
      <Box>
        <Toolbar />
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container>
              <MunchTable rows={items} />
            </Container>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}

export default App;