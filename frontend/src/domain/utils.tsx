import { TableFoodItem } from "../components/MunchTable";

// Five price cases: value =0 is default case(full table), value=5 - want all items less than 5, value=10 - want all items less than 10 but greater than 5
// value=15 - want all items less than 15 but greater than 10, value=20 - want all items less than 20 but greater than 15
// Using >= so that $5.00 and $10.00 items are included, not excluded.
export function FilterByPriceRange(tableFoodItems: TableFoodItem[], priceFilterValue: number): TableFoodItem[]{
  if ((priceFilterValue === 5)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return priceFilterValue >= tableItem.price; })
  } else if ((priceFilterValue === 10)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 5)); })
  } else if ((priceFilterValue === 15)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 10)); })
  } else if ((priceFilterValue === 20)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 15)); })
  } 

  return tableFoodItems;
}

export function FilterByRestaurant(tableFoodItems: TableFoodItem[], currentRestaurantFilters: string[]){
    if (currentRestaurantFilters.length > 0) {
        tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return currentRestaurantFilters.indexOf(tableItem.restaurant_name) !== -1; });
      }

    return tableFoodItems;
}
