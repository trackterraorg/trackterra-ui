import { Button, Link } from '@mui/material';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import downloadFill from '@iconify/icons-eva/download-fill';
import exportFill from '@iconify/icons-ant-design/export-outline';
import PropTypes from 'prop-types';
import { ExportStatus } from '../../common';

ExportButton.propTypes = {
  exportStatus: PropTypes.number,
  onExport: PropTypes.func,
  csvFileUrl: PropTypes.string
};

export default function ExportButton({ exportStatus, onExport, csvFileUrl }) {
  return (
    <>
      {exportStatus === ExportStatus.Idle && (
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Icon icon={exportFill} />}
          color="inherit"
          onClick={onExport}
        >
          Export
        </Button>
      )}

      {exportStatus === ExportStatus.Processing && (
        <Button variant="outlined" disabled sx={{ minWidth: 100 }}>
          <img alt="parsing" src="/static/loading.gif" style={{ maxWidth: 30 }} />
        </Button>
      )}

      {exportStatus === ExportStatus.Done && (
        <Link href={csvFileUrl} underline="none">
          <Button variant="contained" startIcon={<Icon icon={downloadFill} />}>
            Click to download
          </Button>
        </Link>
      )}
    </>
  );
}
