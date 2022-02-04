import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import PropTypes from 'prop-types';
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

TopOperations.propTypes = {
  topOperations: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.string,
      count: PropTypes.number
    })
  )
};

export default function TopOperations(props) {
  const { topOperations } = props;
  const labels = topOperations?.map((operation) => operation.operation);
  const chartData = topOperations?.map((operation) => operation.count);

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.error.main],
    labels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Top Operations" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
