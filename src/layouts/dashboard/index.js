import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import { AccAddress } from '@terra-money/terra.js';
import useAxios from 'axios-hooks';
import NotParsed from '../../pages/NotParsed';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { apiOptions } from '../../utils/apiSettings';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { address } = useParams();
  const [{ response, error }, readWallet] = useAxios(
    apiOptions({
      url: `/wallets/${address}`
    }),
    { manual: true }
  );

  useEffect(() => {
    if (!AccAddress.validate(address)) {
      navigate(`/404`, { replace: false });
    } else {
      readWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (error) return `Fetch data error ${error.message}`;

  let sAddress;
  if (response) {
    const { data } = response.data;
    const { wallet, extras } = data;
    if (!wallet) {
      return <NotParsed />;
    }

    sAddress = extras.sAddress;
  }

  return (
    <RootStyle>
      <DashboardNavbar address={address} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        address={address}
        sAddress={sAddress}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
