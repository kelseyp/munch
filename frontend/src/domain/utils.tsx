import { MunchItem } from "../components/MunchItem";

// Three price cases: value =0 is default case(full table), value=5 - want all items less than 5, value=10 - want all items less than 10 but greater than 5
// Using >= so that $5.00 and $10.00 items are included, not excluded.
export function FilterByPriceRange(tableItems: MunchItem[], priceFilterValue: number): MunchItem[] {
  if ((priceFilterValue === 5)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return priceFilterValue >= tableItem.price; })
  } else if ((priceFilterValue === 10)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 5)); })
  }

  return tableItems;
}

export function FilterByRestaurant(tableItems: MunchItem[], currentRestaurantFilters: string[]) {
  if (currentRestaurantFilters.length > 0) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return currentRestaurantFilters.indexOf(tableItem.restaurant_name) !== -1; });
  }

  return tableItems;
}
