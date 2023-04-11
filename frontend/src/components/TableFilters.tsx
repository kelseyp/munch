import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TableFoodItem } from './MunchTable';

export default function ControlledCheckboxSetup(restaurantName: string, tableFoodItems: TableFoodItem[]) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        
        // console.log(tableFoodItems)
        // //console.log("event name is:", event.target.name)
        // if(event.target.checked) {
        //     for (const item in tableFoodItems) {
        //         console.log(item);
        //         // if (name[4] !== event.target.name) {
        //         //     console.log(name);
        //         // }
        //     }
        // }
    };

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