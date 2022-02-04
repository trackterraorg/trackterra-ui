// import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import {
  Button,
  Grid,
  IconButton,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Draggable, Container as DraggableContainer } from 'react-smooth-dnd';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import Context from './context';
import Field from './Field';
import Operator from './Operator';
import Value from './Value';

const RootStyle = styled(Grid)(({ theme }) => ({
  '& > div': {
    marginBottom: theme.spacing,
    marginTop: theme.spacing
  },
  cursor: 'move',
  padding: theme.spacing(1, 0)
}));

const removeIconStyles = (t) => ({
  removeButton: {
    marginRight: t.spacing(-1),
    marginTop: t.spacing(0.75)
  },
  removeIcon: {
    color: 'red',
    fill: 'rgba(255, 0, 0, 0.9)'
  }
});

const useRuleStyles = styled(({ theme }) => ({
  ...removeIconStyles(theme),
  container: {
    '& > div': {
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(0.5)
    },
    cursor: 'move'
  },
  valueGridItem: {
    flex: 'auto'
  }
}));

const Rule = (props) => {
  const classes = useRuleStyles(props);
  const context = React.useContext(Context);

  const { id, level, position, rule } = props;
  const { combinator, field, operator, rules, value } = rule;

  const { dispatch } = context;

  const testId = `${level}-${position}`;

  return combinator ? (
    <RuleGroup combinator={combinator} id={id} level={level + 1} rules={rules} />
  ) : (
    <RootStyle>
      <Grid container className={classes.container} data-testid={`rule-${testId}`} spacing={2}>
        <Grid item>
          <IconButton
            className={classes.removeButton}
            data-testid={`rule-${testId}-remove`}
            size="small"
            onClick={() => {
              dispatch({ type: 'remove-node', id });
            }}
          >
            <RemoveIcon sx={{ color: 'red' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Field field={field} id={id} testId={testId} />
        </Grid>
        <Grid item>
          <Operator field={field} id={id} operator={operator} testId={testId} />
        </Grid>
        <Grid item className={classes.valueGridItem}>
          <Value field={field} id={id} operator={operator} testId={testId} value={value} />
        </Grid>
      </Grid>
    </RootStyle>
  );
};

Rule.propTypes = {
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  rule: PropTypes.object.isRequired
};

const useRuleGroupStyles = styled((t) => ({
  actionButton: {
    '& svg': {
      marginRight: t.spacing(0.5),
      marginTop: t.spacing(0.25)
    },
    textTransform: 'none'
  },
  combinator: {
    height: 36,
    padding: t.spacing(0, 1.5)
  },
  group: {
    borderLeft: (props) => (props.level > 0 ? `2px solid ${t.palette.divider}` : 'none'),
    paddingLeft: t.spacing(1.5),
    marginBottom: t.spacing(0.5),
    marginTop: (props) => (props.level > 0 ? t.spacing(0.5) : 'none')
  },
  ...removeIconStyles(t)
}));

const RuleGroup = (props) => {
  const classes = useRuleGroupStyles(props);
  const context = React.useContext(Context);

  const { combinator, combinators, id, level, rules } = props;
  const testId = `group-${level}`;

  const { dispatch, maxLevels } = context;

  return level <= maxLevels ? (
    <Grid container className={classes.group} data-testid={testId} direction="column" spacing={1}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton
              data-testid={`${testId}-remove`}
              disabled={level === 0}
              size="small"
              onClick={() => {
                dispatch({ type: 'remove-node', id });
              }}
            >
              <RemoveIcon className={level > 0 ? classes.removeIcon : null} />
            </IconButton>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={combinator}
              onChange={(event, value) => {
                if (value) {
                  dispatch({ type: 'set-combinator', id, value });
                }
              }}
            >
              {combinators.map((item) => (
                <ToggleButton
                  key={item.value}
                  data-testid={`${testId}-combinator-${item.value}`}
                  className={classes.combinator}
                  value={item.value}
                >
                  <Typography variant="body2">{item.label}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Button
              className={classes.actionButton}
              color="primary"
              data-testid={`${testId}-add-rule`}
              onClick={() => {
                dispatch({ type: 'add-rule', id });
              }}
            >
              <AddIcon sx={{ marginRight: 0.5 }} />
              Rule
            </Button>
          </Grid>
          {level < maxLevels && (
            <Grid item>
              <Button
                className={classes.actionButton}
                color="primary"
                data-testid={`${testId}-add-group`}
                onClick={() => {
                  dispatch({ type: 'add-group', id });
                }}
              >
                <AddIcon sx={{ marginRight: 0.5 }} />
                Group
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      {rules?.length > 0 && (
        <Grid item>
          <DraggableContainer
            onDrop={({ addedIndex, removedIndex }) => {
              dispatch({ type: 'move-rule', addedIndex, id, removedIndex });
            }}
          >
            {rules.map((rule, position) => (
              <Draggable key={rule.id}>
                <Rule id={rule.id} level={level} position={position} rule={rule} />
              </Draggable>
            ))}
          </DraggableContainer>
        </Grid>
      )}
    </Grid>
  ) : (
    <span />
  );
};

RuleGroup.defaultProps = {
  combinator: 'and',
  combinators: [
    { label: 'AND', value: 'and' },
    { label: 'OR', value: 'or' }
  ],
  rules: []
};

RuleGroup.propTypes = {
  combinator: PropTypes.string,
  combinators: PropTypes.array,
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  rules: PropTypes.array
};

export default RuleGroup;
