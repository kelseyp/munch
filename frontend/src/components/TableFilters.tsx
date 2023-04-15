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
    //filteredData: Array<String>;
    tableData: Array<TableFoodItem>;
    items: Array<FoodItem>;
    checkedCallback: ((event: any) => void);
}

//const currentlyCheckedBoxes:String[] =[];
let globalControlLabelList: Array<any> = [];

export function RestaurantCheckboxes(props: FilterTableProps) {
    const controlLabelList: Array<any> = [];
    //

    function ControlledCheckboxSetup(restaurantName: string) {
        const [checked, setChecked] = React.useState(true);
        //const [currentlyCheckedBoxes, setCurrentlyCheckedBoxes] = React.useState("");

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
            //console.log(event.target.checked)
            //setCurrentlyCheckedBoxes(event.target.name);
            //console.log(currentlyCheckedBoxes);
            // if (!checked) {
            //     if (!currentlyCheckedBoxes.includes(event.target.name)){
            //         currentlyCheckedBoxes.push(event.target.name);
            //     }
            // } else {
            //     let index = currentlyCheckedBoxes.indexOf(event.target.name);
            //     let removedElement = currentlyCheckedBoxes.splice(index, 1);
            // }
        }
        return (
            <FormControlLabel
                //not sure what keys are normally set to, so made it restaurant name
                key={restaurantName}
                control={
                    <Checkbox checked={checked}
                        onChange={handleChange}
                        name={restaurantName} />}
                label={restaurantName}
            />
        );
    }


    const filteredDataForRestaurant = props.tableData.map(item => item.restaurant_name).filter((value, index, self) => self.indexOf(value) === index)
    filteredDataForRestaurant.forEach((restaurantName: any) => {
        if (!(controlLabelList.includes(restaurantName))) {
            controlLabelList.push(
                ControlledCheckboxSetup(restaurantName)
            )
        }
    });
    //console.log(currentlyCheckedBoxes);
    globalControlLabelList = controlLabelList;
    //console.log("control",controlLabelList);
    //console.log("global control",globalControlLabelList);
    //FilterTheDamnTable(props.tableData);
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {controlLabelList}
            </Box>
        </div>
    );
}

export function FilterTheDamnTable(tableFoodItems: any[]) {
    //This function will initially tell the table what to render,
    //But it does not update when a checkbox is clicked
    //let myCheckedBoxes: string | any[] = ["Lighthouse Cafe"]
    const [myCheckedBoxes, setMyCheckedBoxes] = React.useState([""]);
    //let myCheckedBoxes: string | any[] = []

    if (globalControlLabelList.some(element => element.props.control.props.checked === true)) {
        for (const label of globalControlLabelList) {
            if ((label.props.control.props.checked === true) && (!myCheckedBoxes.includes(label.props.label))) {
                setMyCheckedBoxes(oldArray => [...oldArray, label.props.label]);
            }
        }
    }
    if (globalControlLabelList.some(element => element.props.control.props.checked === false)) {
        for (const label of globalControlLabelList) {
            if (label.props.control.props.checked === false) {
                let index = myCheckedBoxes.indexOf(label.props.label);
                let removedElement = myCheckedBoxes.splice(index, 1);
                setMyCheckedBoxes(oldArray => [...oldArray]);
            }
        }
    }
    let trialFilter = tableFoodItems.filter(name => myCheckedBoxes.includes(name.restaurant_name));
    console.log("trial filter", trialFilter)
    console.log("currentlyCheckedBoxes", myCheckedBoxes)
    if (trialFilter.length === 0) {
        return tableFoodItems;
    } else {
        return trialFilter;
    }
    //return trialFilter;
}


// export function DoTheChanges(controlLabelList: any[], props: FilterTableProps) {
//     //console.log(controlLabelList);
//     //Checks if ANY (idk how to use the any func, but doesnt work on arrays it seems) checkboxes are checked
//     if (controlLabelList.some(element => element.props.control.props.checked === true)) {
//         //if (anyCheckedBoxes.some(v => v === true)) {
//         //const tableFoodItems: TableFoodItem[] = foodItems.filter(checkBoxValue => checkBoxValue.restaurant.name === "Lighthouse Cafe").map((value: FoodItem) => { return mapFoodItemData(value); })
//         //controlLabelList.forEach(checkBoxValue = [controlLabelList.props.label

//         //Making an array to check which checkboxes are currently turned on
//         let checkBoxLabels: any[] = [];
//         for (const label of controlLabelList) {
//             if (label.props.control.props.checked === true) {
//                 checkBoxLabels.push(label.props.label);
//             }
//         }

//         // Grabbing all of the food items with restaurants who are checked
//         let newTableFoodItems = [];
//         for (const restName of checkBoxLabels) {
//             newTableFoodItems.push(props.items.filter(checkBoxValue => checkBoxValue.restaurant.name === restName).map((value: FoodItem) => { return mapFoodItemData(value); }))
//         }

//         //this clears the array
//         let tableFoodItems = [];
//         // because of the output of the previous for loop, the only way to add those
//         for (let i = 0; i < newTableFoodItems.length; i++) {
//             for (let j = 0; j < newTableFoodItems[i].length; j++) {
//                 tableFoodItems.push(newTableFoodItems[i][j]);
//                 //tableFoodItems = newTableFoodItems[i][j].map((value: FoodItem) => { return mapFoodItemData(value); });
//             }
//         }
//         //console.log(tableFoodItems);
//         return tableFoodItems;
//         //console.log(checkBoxLabels);
//     }

//     //console.log(controlLabelList);
//     //console.log(controlLabelList[0].props.control.props.checked);
//     //console.log(tableFoodItems);

// }





export interface ControlledCheckboxProps {
    restaurantCheckboxCallBack: ((event: any) => void);
}
