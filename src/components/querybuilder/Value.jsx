import { Autocomplete, FormControlLabel, FormGroup, Radio, Switch, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { dequal } from 'dequal';
import PropTypes from 'prop-types';
import React from 'react';

import Context from './context';

//-----------------------------------------------------------

const FormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
  fontSize: theme.typography.fontSize
}));

const readNumericValue = (value) => (value !== null && value !== undefined ? value : '');

const supportedTypes = new Set([
  'date',
  'integer',
  'multiselect',
  'number',
  'radio',
  'select',
  'switch',
  'text'
]);

const Value = React.memo(
  (props) => {
    const context = React.useContext(Context);

    const { field, id, operator, value } = props;
    const { customOperators, dispatch, filtersByValue } = context;

    if (/null/i.test(operator)) {
      return <span />;
    }
    const testId = `value-${props.testId}`;
    const filter = field ? { ...filtersByValue[field] } : { type: null };

    if (!supportedTypes.has(filter.type)) {
      const customOperator = customOperators[filter.type];
      filter.type = customOperator?.type;
    }
    const handleTextFieldChange = (event) => {
      dispatch({ type: 'set-value', id, value: event.target.value });
    };
    switch (filter.type) {
      // case 'date':
      //   return (
      //     <DatePicker
      //       clearable
      //       data-testid={testId}
      //       value={value || null}
      //       onChange={(date) => {
      //         const value = date ? format(date, 'yyyy-MM-dd') : null;
      //         dispatch({ type: 'set-value', id, value });
      //       }}
      //     />
      //   );
      case 'integer':
        return (
          <TextField
            data-testid={testId}
            type="number"
            value={readNumericValue(value)}
            onChange={handleTextFieldChange}
            onKeyPress={(event) => {
              if (/\.|,/.test(event.key)) {
                event.preventDefault();
              }
            }}
            size="small"
          />
        );
      case 'multiselect':
        return (
          <Autocomplete
            filterSelectedOptions
            fullWidth
            multiple
            openOnFocus
            data-testid={testId}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            limitTags={-1}
            options={filter.options}
            renderInput={(params) => <TextField {...params} />}
            size="small"
            style={{ minWidth: 250 }}
            value={filter.options.filter((op) => value?.includes(op.value))}
            onChange={(event, selected) => {
              const value = (selected || []).map((item) => item.value);
              dispatch({ type: 'set-value', id, value });
            }}
          />
        );
      case 'number':
        return (
          <TextField
            data-testid={testId}
            type="number"
            value={readNumericValue(value)}
            onChange={handleTextFieldChange}
            size="small"
          />
        );
      case 'radio':
        return (
          <FormGroup row>
            <FormControlLabelStyle>
              <FormControlLabel
                control={
                  <Radio
                    checked={value === true}
                    color="primary"
                    data-testid={`${testId}-true`}
                    name={testId}
                    value={value}
                    onChange={() => {
                      dispatch({ type: 'set-value', id, value: true });
                    }}
                  />
                }
                label="True"
                value={value}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={value === false}
                    color="primary"
                    data-testid={`${testId}-false`}
                    name={testId}
                    value={value}
                    onChange={() => {
                      dispatch({ type: 'set-value', id, value: false });
                    }}
                  />
                }
                label="False"
                value={value}
              />
            </FormControlLabelStyle>
          </FormGroup>
        );
      case 'select':
        return (
          <Autocomplete
            data-testid={testId}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            options={filter.options}
            renderInput={(params) => <TextField {...params} />}
            style={{ width: 250 }}
            value={filter.options.find((op) => value === op.value)}
            onChange={(event, selected) => {
              const value = selected ? selected.value : null;
              dispatch({ type: 'set-value', id, value });
            }}
          />
        );
      case 'switch':
        return (
          <Switch
            color="primary"
            data-testid={testId}
            checked={value || false}
            onChange={(event) => {
              const value = event.target.checked;
              dispatch({ type: 'set-value', id, value });
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            data-testid={testId}
            value={value || ''}
            onChange={handleTextFieldChange}
            size="small"
          />
        );
    }
  },
  (prevProps, nextProps) =>
    // Skip re-rendering if the value didn't change.
    dequal(prevProps, nextProps)
);

Value.propTypes = {
  field: PropTypes.string,
  id: PropTypes.number.isRequired,
  operator: PropTypes.string,
  testId: PropTypes.string.isRequired,
  value: PropTypes.any
};

Value.whyDidYouRender = false;

export default Value;
