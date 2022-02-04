import { Icon } from '@iconify/react';
import bankFilled from '@iconify/icons-ant-design/bank-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import PropTypes from 'prop-types';
import { fShortenNumber } from '../../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

NumberOfTransactions.propTypes = {
  txCount: PropTypes.number
};

export default function NumberOfTransactions(props) {
  const { txCount } = props;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={bankFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4">{fShortenNumber(txCount)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Number of transactions
      </Typography>
    </RootStyle>
  );
}
