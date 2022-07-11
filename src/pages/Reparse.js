// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// layouts
import DashboardLayout from '../layouts/dashboard';
// components
import Page from '../components/Page';
import { ReparseForm } from '../components/reparse';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ReparsePage() {
  return (
    <RootStyle title="TrackTerra | Reparse">
      <DashboardLayout />
      <Container>
        <ContentStyle>
          <ReparseForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
