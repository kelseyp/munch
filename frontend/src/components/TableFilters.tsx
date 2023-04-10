import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ControlledCheckbox(restaurantName: string) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
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