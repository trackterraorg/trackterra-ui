import _, { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import { v1 as uuid } from 'uuid';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { apiOptions } from '../utils/apiSettings';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ProtocolsListHead, ProtocolsListToolbar } from '../components/protocols';
//
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'protocolName', label: 'Protocol', alignRight: false },
  { id: 'txType', label: 'Transaction type', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_protocol) =>
        _protocol.protocolName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _protocol.txType.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default () => {
  const { chain } = useParams();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('protocolName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [{ response, loading, error }] = useAxios(
    apiOptions({
      url: '/parser/protocols',
      params: {
        chain: _.capitalize(chain)
      }
    })
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  if (loading) return null;
  if (error) return <>{error.message}</>;
  const { data } = response.data;
  const SUPPORTED_PROTOCOLS = data;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SUPPORTED_PROTOCOLS.length) : 0;

  const filteredProtocols = applySortFilter(
    SUPPORTED_PROTOCOLS,
    getComparator(order, orderBy),
    filterName
  );

  const isProtocolNotFound = filteredProtocols.length === 0;

  return (
    response && (
      <Page title="Protocols | TrackTerra">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Supported protocols
            </Typography>
          </Stack>

          <Card>
            <ProtocolsListToolbar filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ProtocolsListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={SUPPORTED_PROTOCOLS.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredProtocols
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { protocolName, txType } = row;

                        return (
                          <TableRow hover key={uuid()} tabIndex={-1} role="checkbox">
                            <TableCell align="left">{protocolName}</TableCell>
                            <TableCell align="left">{txType}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isProtocolNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={SUPPORTED_PROTOCOLS.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    )
  );
};
