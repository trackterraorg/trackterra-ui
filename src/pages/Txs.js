import _ from 'lodash';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import filterFill from '@iconify/icons-ant-design/filter-outline';
import { useParams } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  CircularProgress
} from '@mui/material';
// components
import useAxios from 'axios-hooks';
import { ExportStatus } from '../common';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ExportButton, TxListFilter, TxListHead, TxRow } from '../components/txs';
//
import { apiOptions, getCsvFileUrl } from '../utils/apiSettings';
import { TABLE_FIELDS } from '../data/txs';
// ----------------------------------------------------------------------

export default function TxPage() {
  const { address } = useParams();
  const [page, setPage] = useState(0);
  const [q, setQ] = useState();
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilterToolbar, setShowFilterToolbar] = useState(false);
  const [exportStatus, setExportStatus] = useState(ExportStatus.Idle);
  const [taxApp, setTaxApp] = useState();
  const [csvFileUrl, setCsvFileUrl] = useState('');
  const [{ data, loading }] = useAxios(
    apiOptions({
      url: `/txs/${address}`,
      params: {
        page: page + 1,
        take: rowsPerPage,
        q,
        order,
        orderBy
      }
    })
  );

  const [{ data: exportData }, exportFunc] = useAxios(
    apiOptions({
      url: `/txs/${address}`,
      params: {
        q,
        order,
        orderBy,
        csv: true,
        taxapp: taxApp
      }
    }),
    { manual: true }
  );

  useEffect(() => {
    if (taxApp) {
      setExportStatus(ExportStatus.Processing);
      const doExportFunc = _.debounce(() => {
        exportFunc();
      }, 2000);

      doExportFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxApp]);

  useEffect(() => {
    if (exportData) {
      setExportStatus(ExportStatus.Done);
      setCsvFileUrl(getCsvFileUrl(address, exportData.csvFileName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportData]);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFilterToolbar = () => {
    setShowFilterToolbar(!showFilterToolbar);
  };

  const handleApplyFilter = (query) => {
    setQ(query);
  };

  const handleExportButton = (taxAppToExport) => {
    setTaxApp(taxAppToExport);
  };

  const handleAfterExportButton = () => {
    setExportStatus(ExportStatus.Idle);
    setTaxApp('');
  };

  // if (loading) return <Loading msg="Loading transactions, please wait ...." />;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const txs = data?.txs;
  const totalCount = data?.totalCount;
  const notTxFound = !txs;

  return (
    <Page title="Transactions | TrackTerra">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Transactions
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleFilterToolbar}
              startIcon={<Icon icon={filterFill} />}
            >
              Filter
            </Button>
            <ExportButton
              onExport={handleExportButton}
              onAfterExport={handleAfterExportButton}
              exportStatus={exportStatus}
              csvFileUrl={csvFileUrl}
            />
          </Stack>
        </Stack>
        <TxListFilter
          showFilter={showFilterToolbar}
          numSelected={0}
          onApplyFilter={handleApplyFilter}
        />
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {txs && !loading && (
                <Table>
                  <TxListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_FIELDS}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {txs.map((row) => {
                      const { tx, extras } = row;
                      const txData = { ...tx, ...extras };
                      return <TxRow tableHeader={TABLE_FIELDS} txData={txData} key={tx.id} />;
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 100 * emptyRows }}>
                        <TableCell colSpan={TABLE_FIELDS.length} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
              {loading && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={TABLE_FIELDS.length} sx={{ py: 3 }}>
                        <Box sx={{ display: 'flex', padding: 5, justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              {notTxFound && !loading && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={TABLE_FIELDS.length} sx={{ py: 3 }}>
                        <SearchNotFound />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Scrollbar>

          {totalCount > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
    </Page>
  );
}
