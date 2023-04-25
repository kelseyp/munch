import { TableFoodItem } from "../components/MunchTable";

// Three price cases: value =0 is default case(full table), value=5 - want all items less than 5, value=10 - want all items less than 10 but greater than 5
// Using >= so that $5.00 and $10.00 items are included, not excluded.
export function FilterByPriceRange(tableFoodItems: TableFoodItem[], priceFilterValue: number): TableFoodItem[]{
  if ((priceFilterValue === 5)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return priceFilterValue >= tableItem.price; })
  } else if ((priceFilterValue === 10)) {
    tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 5)); })
  }

  return tableFoodItems;
}

export function FilterByRestaurant(tableFoodItems: TableFoodItem[], currentRestaurantFilters: string[]){
    if (currentRestaurantFilters.length > 0) {
        tableFoodItems = tableFoodItems.filter((tableItem: TableFoodItem) => { return currentRestaurantFilters.indexOf(tableItem.restaurant_name) !== -1; });
      }

    return tableFoodItems;
}
