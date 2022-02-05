import PropTypes from 'prop-types';
// ----------------------------------------------------------------------
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  alignContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

// ----------------------------------------------------------------------

Loading.propTypes = {
  msg: PropTypes.string
};

export default function Loading(props) {
  const { msg } = props;
  return (
    <RootStyle>
      <img alt="Loading" src="/static/loading.gif" />
      {msg && (
        <Typography variant="h4" sx={{ px: 5, mt: 0, mb: 5 }}>
          {msg}
        </Typography>
      )}
    </RootStyle>
  );
}
