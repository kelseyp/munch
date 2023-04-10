import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ControlledCheckbox(restaurantName : string) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked}
            key={restaurantName}
            onChange={handleChange}
            name={restaurantName} />}
        label={restaurantName}
    />
  );
}