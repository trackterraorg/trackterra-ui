import { Autocomplete, TextField } from '@mui/material';
import { dequal } from 'dequal';
import PropTypes from 'prop-types';
import React from 'react';

import Context from './context';

const Operator = React.memo(
  (props) => {
    const context = React.useContext(Context);
    const { field, id, operator, testId } = props;

    const { dispatch, filtersByValue, operatorsByType, operatorsByValue } = context;

    const filter = field ? filtersByValue[field] : null;
    const options = filter ? operatorsByType[filter.type] : [];
    const value = operator ? operatorsByValue[operator] : null;

    return (
      <Autocomplete
        fullWidth
        data-testid={`operator-${testId}`}
        disableClearable
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder="Operator" size="small" variant="outlined" />
        )}
        style={{ minWidth: 200 }}
        value={value}
        onChange={(event, selected) => {
          const { value } = selected;
          dispatch({ type: 'set-operator', id, value });
        }}
      />
    );
  },
  (prevProps, nextProps) =>
    // Skip re-rendering if the operator didn't change.
    dequal(prevProps, nextProps)
);

Operator.propTypes = {
  field: PropTypes.string,
  id: PropTypes.number.isRequired,
  operator: PropTypes.string,
  testId: PropTypes.string.isRequired
};

Operator.whyDidYouRender = false;

export default Operator;
