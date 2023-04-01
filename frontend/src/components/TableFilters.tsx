// https://stackoverflow.com/questions/57774017/filter-table-with-checkboxes-with-react-material-ui

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, {Component} from 'react';

class FilterCheckboxes extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false
  };

const FilterCheckboxes = ({onFilterChanged, checkedA, checkedB, /* ... and so forth or as separate object */}) => {
 return (

        <FormGroup>
          <div className="filter__checkboxes">
            <div className="filter__checkboxes-column">
              <div className="checkboxes">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedA}
                      color="primary"
                      onChange={onFilterChanged("checkedA")}
                      value="checkedA"
                    />
                  }
                  label="Submitted"
                />
              </div>

            {/* your other checkboxes */}
            </div>
          </div>
        </FormGroup>

    );
};
