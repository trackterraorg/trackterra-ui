// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SearchNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found. Try to change filters.
      </Typography>
    </Paper>
  );
}
