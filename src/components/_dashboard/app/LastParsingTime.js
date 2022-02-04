import { Icon } from '@iconify/react';
import clockCircleTwoTone from '@iconify/icons-ant-design/clock-circle-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

LastParsingTime.propTypes = {
  lastParsingTime: PropTypes.string
};

export default function LastParsingTime(props) {
  const { lastParsingTime } = props;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={clockCircleTwoTone} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4">{lastParsingTime}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Last parsing time
      </Typography>
    </RootStyle>
  );
}
