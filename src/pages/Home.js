// material
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
// layouts
import HomeLayout from '../layouts/HomeLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { ParserForm } from '../components/parser';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

export default function Home() {
  return (
    <RootStyle title="TrackTerra | Parser">
      <HomeLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage your terra transactions effectively with TrackTerra
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <ParserForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
