import { MunchItem } from "../components/MunchItem";

// Five price cases: value =0 is default case(full table), value=5 - want all items less than 5, value=10 - want all items less than 10 but greater than 5
// value=15 - want all items less than 15 but greater than 10, value=20 - want all items less than 20 but greater than 15
// Using >= so that $5.00 and $10.00 items are included, not excluded.
export function FilterByPriceRange(tableItems: MunchItem[], priceFilterValue: number): MunchItem[] {
  if ((priceFilterValue === 5)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return priceFilterValue >= tableItem.price; })
  } else if ((priceFilterValue === 10)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 5)); })
  } else if ((priceFilterValue === 15)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 10)); })
  } else if ((priceFilterValue === 20)) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return ((priceFilterValue >= tableItem.price) && (tableItem.price >= 15)); })
  } 

  return tableItems;
}

export function FilterByRestaurant(tableItems: MunchItem[], currentRestaurantFilters: string[]) {
  if (currentRestaurantFilters.length > 0) {
    tableItems = tableItems.filter((tableItem: MunchItem) => { return currentRestaurantFilters.indexOf(tableItem.restaurant.name) !== -1; });
  }

  return tableItems;
}

export type Order = 'asc' | 'desc';

export function sortItemsByKey(orderBy: keyof MunchItem, order: Order): ((a: MunchItem, b: MunchItem) => number) | undefined {
  return (left: MunchItem, right: MunchItem): number => {
    let a = left[orderBy];
    let b = right[orderBy];
    if (orderBy === 'restaurant') {
      a = left[orderBy].name;
      b = right[orderBy].name;
    }

    let comparison = 0;
    if (a < b) {
      comparison = -1;
    } else if (a > b) {
      comparison = 1;
    }

    return (order === 'asc') ? comparison : -1 * comparison;
  };
}
