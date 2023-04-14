import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { mapFoodItemData } from '../App';
import Box from '@mui/material/Box';
import { TableFoodItem } from './MunchTable';

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

export interface FilterTableProps {
    //filteredData: Array<String>
    tableData: Array<TableFoodItem>
    items: Array<FoodItem>
}

export function RestaurantCheckboxes(props: FilterTableProps) {
    const controlLabelList: Array<any> = [];
    const filteredDataForRestaurant = props.tableData.map(item => item.restaurant_name).filter((value, index, self) => self.indexOf(value) === index)
    filteredDataForRestaurant.forEach((restaurantName: any) => {
        if (!(controlLabelList.includes(restaurantName))) {
            controlLabelList.push(
                ControlledCheckboxSetup(restaurantName, props, controlLabelList)
            )
        }
    });
    //console.log(controlLabelList);
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {controlLabelList}
            </Box>
        </div>
    );
}



export function ControlledCheckboxSetup(restaurantName: string, props: FilterTableProps, controlLabelList: any[]) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // }
        // function DoTheChanges(){
        //console.log(controlLabelList);
        //Checks if ANY (idk how to use the any func, but doesnt work on arrays it seems) checkboxes are checked
        if (controlLabelList.some(element => element.props.control.props.checked === true)) {
            //if (anyCheckedBoxes.some(v => v === true)) {
            //const tableFoodItems: TableFoodItem[] = foodItems.filter(checkBoxValue => checkBoxValue.restaurant.name === "Lighthouse Cafe").map((value: FoodItem) => { return mapFoodItemData(value); })
            //controlLabelList.forEach(checkBoxValue = [controlLabelList.props.label

            //Making an array to check which checkboxes are currently turned on
            let checkBoxLabels: any[] = [];
            for (const label of controlLabelList) {
                if (label.props.control.props.checked === true) {
                    checkBoxLabels.push(label.props.label);
                }
            }

            // Grabbing all of the food items with restaurants who are checked
            let newTableFoodItems = [];
            for (const restName of checkBoxLabels) {
                newTableFoodItems.push(props.items.filter(checkBoxValue => checkBoxValue.restaurant.name === restName).map((value: FoodItem) => { return mapFoodItemData(value); }))
            }

            //this clears the array
            const tableFoodItems = [];
            // because of the output of the previous for loop, the only way to add those
            for (let i = 0; i < newTableFoodItems.length; i++) {
                for (let j = 0; j < newTableFoodItems[i].length; j++) {
                    tableFoodItems.push(newTableFoodItems[i][j]);
                }
            }

            //console.log(checkBoxLabels);

            //console.log(tableFoodItems);
        }
        //console.log(controlLabelList);
        //console.log(controlLabelList[0].props.control.props.checked);
        //console.log(tableFoodItems);

    }

    return (
        <FormControlLabel
            key={restaurantName}
            control={
                <Checkbox checked={checked}
                    onChange={handleChange}
                    name={restaurantName} />}
            label={restaurantName}
        />
    );
}
export interface ControlledCheckboxProps {
    restaurantCheckboxCallBack: ((event: any) => void);
}