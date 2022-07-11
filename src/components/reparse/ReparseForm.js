import { useState } from 'react';
// material
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { apiOptions } from '../../utils/apiSettings';
import Loading from '../Loading';
import ParsingStatus from '../../common/parsing-status.enum';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import palette from '../../theme/palette';
// ----------------------------------------------------------------------
const FormStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ParserForm() {
  const { chain, address } = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReparse = () => {
    setOpen(false);
    parseWallet({
      url: `/wallets/reparse`,
      params: {
        chain: _.capitalize(chain),
        address
      }
    });
  };

  const [{ response, loading, error }, parseWallet] = useAxios(
    apiOptions({
      method: 'PUT',
      timeout: 600000
    }),
    { manual: true }
  );

  const processResponse = (response) => {
    const { data } = response.data;

    const { status, msg } = data;

    if (status === ParsingStatus.Done) {
      return (
        <div>
          <SuccessMessage msg={msg} />
          <Button
            color="info"
            size="large"
            type="button"
            variant="contained"
            onClick={() => {
              window.location = `/account/${_.lowerCase(chain)}/${address}/txs`;
            }}
            sx={{ mx: 2 }}
          >
            Go to transactions
          </Button>
        </div>
      );
    }

    if (status === ParsingStatus.Parsing) {
      return <Loading />;
    }

    if (status === ParsingStatus.Idle) {
      return <Loading />;
    }

    return <ErrorMessage msg={msg} />;
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.message} />;
  if (response) return processResponse(response);

  return (
    <div>
      <FormStyle>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Reparse
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Reparsing is usefull when the account is has not been parsed for a long time or new
            protocols are added to the system
          </Typography>

          <Typography sx={{ mt: 1, color: palette.info.main }}>
            It will take longer than normal because it starts from beginning
          </Typography>
        </Box>

        <Button
          color="info"
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleClickOpen}
        >
          Reparse
        </Button>
      </FormStyle>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reparse account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reparse this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReparse} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
