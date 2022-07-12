// material
import { styled } from '@mui/material/styles';
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ReparseForm } from '../components/reparse';

export default function ReparsePage() {
  return (
    <Page title="Transactions | TrackTerra">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reparse
          </Typography>
        </Stack>
        <Card>
          <ReparseForm />
        </Card>
      </Container>
    </Page>
  );
}
