import PropTypes from 'prop-types';
// ----------------------------------------------------------------------
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { Container } from '@mui/system';
import palette from '../theme/palette';
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

SuccessMessage.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string
};

export default function SuccessMessage(props) {
  const { title, msg } = props;
  return (
    <RootStyle>
      {title && (
        <Container sx={{ mt: 2, mb: 5, color: palette.success.darker }}>
          <Typography variant="h4">{_.capitalize(title)}</Typography>
          <hr />
        </Container>
      )}
      {msg && <Typography sx={{ mt: 0, mb: 5, color: palette.success.dark }}>{msg}</Typography>}
    </RootStyle>
  );
}
