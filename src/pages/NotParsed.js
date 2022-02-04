import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function NotParsed() {
  return (
    <RootStyle title="Not Parsed | TrackTerra">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Wallet address not parsed
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find your wallet address or you have not parsed it before. Go ahead
              and parse now to see its transactions and details
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/empty.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Parse now
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
