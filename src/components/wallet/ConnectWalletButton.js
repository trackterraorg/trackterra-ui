import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CHAINS from '../../data/chains';

ConnectWalletButton.propTypes = {
  onUseWallet: PropTypes.func
};

export default function ConnectWalletButton({ onUseWallet }) {
  const {
    status,
    network,
    wallets,
    availableConnections,
    availableConnectTypes,
    supportFeatures,
    connect,
    disconnect
  } = useWallet();

  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const handleErrorDialogOpen = () => {
    setOpenErrorDialog(true);
  };

  const handleErrorDialogClose = () => {
    setOpenErrorDialog(false);
  };

  const terraStationOnly = availableConnections.find(
    (availableConnection) => availableConnection.name === 'Terra Station Wallet'
  );

  console.log(
    JSON.stringify(
      {
        status,
        network,
        wallets,
        supportFeatures: Array.from(supportFeatures),
        availableConnectTypes
      },
      null,
      2
    )
  );

  const populateUsingWallet = () => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      const chain = CHAINS.find((chain) => chain.chainID === network.chainID);

      if (!chain) {
        handleErrorDialogOpen();
        return;
      }

      const address = _.first(wallets).terraAddress;
      onUseWallet(chain.label, address);
    }
  };

  return (
    <>
      {status === WalletStatus.WALLET_NOT_CONNECTED && terraStationOnly && (
        <>
          <Button
            color="info"
            fullWidth
            size="large"
            variant="contained"
            key={`connection-${terraStationOnly.type}${terraStationOnly.identifier}`}
            onClick={() => connect(terraStationOnly.type, terraStationOnly.identifier)}
          >
            Connect {terraStationOnly.name}
          </Button>
        </>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <Stack spacing={3} direction="row">
          <Button
            color="info"
            fullWidth
            size="large"
            variant="contained"
            onClick={() => populateUsingWallet()}
          >
            Use wallet
          </Button>
          <Button
            color="info"
            fullWidth
            size="large"
            variant="contained"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        </Stack>
      )}

      <Dialog
        open={openErrorDialog}
        onClose={handleErrorDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Use mainnet or classic?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The chain you have selected is not supported at the moment. Please use either mainnet or
            classic.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} autoFocus>
            Ok Thanks
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
