import PropTypes from 'prop-types';
// material
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableBody,
  Link
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

const DetailViewStyle = styled(Box)({
  'td, th': { border: 0 },
  'td:first-of-type': { fontWeight: 'bolder' }
});

TxRow.propTypes = {
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      alignRight: PropTypes.bool
    })
  )
};

export default function TxRow(props) {
  const { tableHeader, ...other } = props;
  const { txData } = other;
  const [open, setOpen] = useState(false);

  const isTxhashCell = (id) => id === 'sTxHash';

  const sTxHashCell = (rowData) => (
    <Link
      href={`https://finder.terra.money/columbus-5/tx/${rowData.txhash}`}
      target="_blank"
      rel="noreferrer"
    >
      {rowData.sTxHash}
    </Link>
  );

  const renderTableCells = (rowData) =>
    tableHeader.map((tableHeader, id) => (
      <TableCell align="left" key={rowData.id + id}>
        {isTxhashCell(tableHeader.id) ? sTxHashCell(rowData) : <>{rowData[tableHeader.id]}</>}
      </TableCell>
    ));

  return (
    <>
      <TableRow hover key={txData.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {renderTableCells(txData)}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div" variant="h6">
                Details
              </Typography>
              <DetailViewStyle>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {txData?.txhash && (
                      <TableRow>
                        <TableCell>Txhash</TableCell>
                        <TableCell>{txData.txhash}</TableCell>
                      </TableRow>
                    )}
                    {txData?.sender && (
                      <TableRow>
                        <TableCell>Sender</TableCell>
                        <TableCell>{txData.sender}</TableCell>
                      </TableRow>
                    )}
                    {txData?.recipient && (
                      <TableRow>
                        <TableCell>Recipient</TableCell>
                        <TableCell>{txData.recipient}</TableCell>
                      </TableRow>
                    )}
                    {txData?.contract && (
                      <TableRow>
                        <TableCell>Contract</TableCell>
                        <TableCell>{txData.contract}</TableCell>
                      </TableRow>
                    )}
                    {txData?.memo && (
                      <TableRow>
                        <TableCell>Memo</TableCell>
                        <TableCell>{txData.memo}</TableCell>
                      </TableRow>
                    )}
                    {txData?.friendlyDescription && (
                      <TableRow>
                        <TableCell>Friendly description</TableCell>
                        <TableCell>{txData.friendlyDescription}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </DetailViewStyle>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
