import './App.css';

import * as React from 'react';
import { useEffect, useState } from 'react';

import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FilterByPriceRange, FilterByRestaurant, Order, sortItemsByKey } from './domain/utils';

import { ItemDetailDialog } from './components/ItemDetailDialog';
import MunchGrid from './components/MunchGrid';
import { MunchItem } from './components/MunchItem';
import MunchTable from './components/MunchTable';
import SearchBar from './components/SearchBar';

function App() {
  const [displayItems, setDisplayItems] = useState<MunchItem[]>([]);
  const [restaurantFilters, setRestaurantFilters] = useState<string[]>([]);
  const [currentRestaurantFilters, setCurrentRestaurantFilters] = useState<string[]>([]);
  const [showTable, setShowTable] = useState<string>("none");
  const [showGrid, setShowGrid] = useState<string>("show");
  const [pageView, setPageView] = React.useState<string | null>('grid');
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof MunchItem>('name');
  const [priceFilterValue, setPriceFilterValue] = React.useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MunchItem|null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001`).then((response: Response) => {
      response.json().then((json: any) => {
        const munchItems: MunchItem[] = JSON.parse(json) as MunchItem[];
        const restaurantNames = new Set<string>(munchItems.map((value: MunchItem) => { return value.restaurant.name; }))
        setRestaurantFilters(Array.from(restaurantNames).sort());
        setDisplayItems(munchItems);
      })
    });

  }, [])

  const handleSearchWordChange = (event: any) => {
    let searchWord = event.target.value;
    fetch(`http://localhost:3001/searchbar?keyword=${searchWord}`).then((response: Response) => {
      response.json().then((json: any) => {
        const munchItems: MunchItem[] = JSON.parse(json) as MunchItem[];
        const restaurantNames = new Set<string>(munchItems.map((value: MunchItem) => { return value.restaurant.name; }))
        setRestaurantFilters(Array.from(restaurantNames).sort());
        setDisplayItems(munchItems);
      })
    });
  }

  const handlePageView = (
    event: React.MouseEvent<HTMLElement>,
    newPageView: string | null,
  ) => {
    setPageView(newPageView);
    if (newPageView === "grid") {
      setShowTable("none");
      setShowGrid("show");
    } else {
      setShowTable("show");
      setShowGrid("none");
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
    setOrderBy((event.target as HTMLInputElement).value as keyof MunchItem);
    setOrder('asc');
  };

  let handleSortTableChange = (order: Order, orderBy: keyof MunchItem) => {
    setOrderBy(orderBy);
    setOrder(order);
  };
  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilterValue(parseInt(event.target.value, 10));
  };

  const handleDialogOpen = (item: MunchItem) => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  let munchItems: MunchItem[] = displayItems;
  munchItems = FilterByPriceRange(munchItems, priceFilterValue);
  munchItems = FilterByRestaurant(munchItems, currentRestaurantFilters);

  munchItems.sort(sortItemsByKey(orderBy, order));

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ padding: 1, maxHeight: 64 }}>
            <img src="./LOGO.PNG" height="48" alt="Logo" />
          </Box>
          <Typography
            variant="h4"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, pt: 1 }}
          >
            Munch
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
                <FormControlLabel value={15} control={<Radio />} label="$10 - $15" />
                <FormControlLabel value={20} control={<Radio />} label="$15 - $20" />
              </RadioGroup>
              <Divider />
              Sort By
              <RadioGroup
                aria-labelledby="sort-by-radio-button-group"
                defaultValue="name"
                name="radio-buttons-group"
                value={orderBy}
                onChange={handleSortByChange}
              >
                <FormControlLabel value="name" control={<Radio />} label="Food Item" />
                <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
                <FormControlLabel value="price" control={<Radio />} label="Price" />
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
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table" >
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <MunchTable rows={munchItems} show={showTable} order={order} orderBy={orderBy} sortCallback={handleSortTableChange} />
        <MunchGrid cards={munchItems} show={showGrid} handleDialogOpen={handleDialogOpen} />
      </Box>
      {selectedItem ?
        <ItemDetailDialog
          selectedItem={selectedItem}
          open={dialogOpen}
          handleDialogClose={handleDialogClose}
        />
        : <></>
      }
    </Box>
  );
}

export default App;
