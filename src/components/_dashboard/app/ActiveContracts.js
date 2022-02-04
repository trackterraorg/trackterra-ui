import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader, Grid } from '@mui/material';
// utils
import PropTypes from 'prop-types';
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
// ----------------------------------------------------------------------

ActiveContracts.propTypes = {
  activeContracts: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.string,
      count: PropTypes.number
    })
  )
};

export default function ActiveContracts(props) {
  const { activeContracts } = props;
  const contracts = activeContracts?.map((c) => c.contract);
  const activeCounts = [{ data: activeContracts?.map((c) => c.count) }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: contracts
    }
  });

  return (
    <>
      {!activeContracts && (
        <Card>
          <Grid container direction="row" alignItems="center" height={364} textAlign="center">
            <Box sx={{ mx: 3 }} textAlign="center" width="100%">
              No interaction with contracts found
            </Box>
          </Grid>
        </Card>
      )}
      {activeContracts && (
        <Card>
          <CardHeader
            title="Active Contracts"
            subheader="List of active contracts followed by their number of activity"
          />
          <Box sx={{ mx: 3 }} dir="ltr">
            <ReactApexChart type="bar" series={activeCounts} options={chartOptions} height={364} />
          </Box>
        </Card>
      )}
    </>
  );
}
