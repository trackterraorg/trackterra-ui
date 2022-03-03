import PropTypes from 'prop-types';
// material
import { Button, Card, Collapse, Stack } from '@mui/material';
import { useState } from 'react';
import filterOperators from '../../data/operators';
import filters from '../../data/filters';
import QueryBuilder from '../querybuilder';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TxListFilter = ({ showFilter, onApplyFilter }) => {
  const [query, setQuery] = useState();

  const handleApplyFilter = () => {
    const valid = QueryBuilder.isQueryValid(query);
    if (!valid) {
      console.log('invalid');
      return;
    }
    const formattedQuery = QueryBuilder.formatQuery(query);

    formattedQuery.rules = formattedQuery.rules.map((rule) => {
      if (rule.field === 'protocol') {
        const onlyUnclassified = rule.value;
        rule.value = 'Unclassified';
        if (onlyUnclassified) {
          rule.operator = '_EQ';
        } else {
          rule.operator = '_NE';
        }
      }
      return rule;
    });

    onApplyFilter(JSON.stringify(formattedQuery));
  };

  return (
    <Collapse in={showFilter} timeout={500}>
      <Card sx={{ padding: 3, marginBottom: 3 }}>
        <QueryBuilder
          filters={filters}
          query={query}
          operators={filterOperators}
          onChange={(query) => {
            setQuery(query);
          }}
        />
        <Stack direction="row" alignItems="right" justifyContent="space-between" mt={2} ml={2}>
          <Button variant="contained" color="primary" onClick={handleApplyFilter}>
            Apply filter
          </Button>
        </Stack>
      </Card>
    </Collapse>
  );
};

TxListFilter.propTypes = {
  showFilter: PropTypes.bool,
  onApplyFilter: PropTypes.func
};

export default TxListFilter;
