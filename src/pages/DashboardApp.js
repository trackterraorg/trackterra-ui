// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
// components
import Page from '../components/Page';
import {
  LastParsingTime,
  UnclassifiedTxCount,
  HighestParsedBlock,
  NumberOfTransactions,
  TopOperations,
  ActiveContracts
} from '../components/_dashboard/app';
import { apiOptions } from '../utils/apiSettings';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { address } = useParams();
  const [{ data, loading, error }] = useAxios(
    apiOptions({
      url: `/wallets/detail/${address}`
    })
  );

  if (loading) return null;
  if (error) return `Fetch data error ${error.message}`;
  const walletDetail = data;

  const {
    txCount,
    unclassifiedTxCount,
    lastParsingTime,
    highestParsedBlock,
    topActiveContracts,
    topOperations
  } = walletDetail;

  return (
    <Page title="Dashboard | TrackTerra">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <NumberOfTransactions txCount={txCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LastParsingTime lastParsingTime={lastParsingTime} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HighestParsedBlock highestParsedBlock={highestParsedBlock} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UnclassifiedTxCount unclassifiedTxCount={unclassifiedTxCount} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ActiveContracts activeContracts={topActiveContracts} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TopOperations topOperations={topOperations} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
