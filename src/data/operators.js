const filterOperators = [
  {
    label: 'Equal to',
    value: '_EQ',
    types: ['date', 'integer', 'number', 'radio', 'select', 'switch', 'text']
  },
  {
    label: 'Not equal to',
    value: '_NE',
    types: ['date', 'integer', 'number', 'radio', 'select', 'switch', 'text']
  },
  {
    label: 'Contains',
    value: '_CONTAINS',
    types: ['text']
  },
  {
    label: 'Less than',
    value: '_LT',
    types: ['number', 'integer']
  },
  {
    label: 'Greater than',
    value: '_GT',
    types: ['number', 'integer']
  },
  {
    label: 'Less than or equal to',
    value: '_LTE',
    types: ['number', 'integer']
  },
  {
    label: 'Greater than or equal to',
    value: '_GTE',
    types: ['number', 'integer']
  },
  {
    label: 'In',
    value: '_IN',
    types: ['multiselect']
  },
  {
    label: 'Not in',
    value: '_NIN',
    types: ['multiselect']
  }
];

export default filterOperators;
