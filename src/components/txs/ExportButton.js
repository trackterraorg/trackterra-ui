import { Button, FormControl, IconButton, InputLabel, Link, MenuItem, Select } from '@mui/material';
import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
import PropTypes from 'prop-types';
import React from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import { ExportStatus } from '../../common';
import { TAX_APPS } from '../../data/taxapps';

ExportButton.propTypes = {
  exportStatus: PropTypes.number,
  onExport: PropTypes.func,
  onAfterExport: PropTypes.func,
  csvFileUrl: PropTypes.string
};

export default function ExportButton({ exportStatus, onExport, onAfterExport, csvFileUrl }) {
  const [exportApp, setExportApp] = React.useState('');

  const onSelectApp = (event) => {
    const taxApp = event?.target?.value;
    if (taxApp) {
      setExportApp(taxApp);
      onExport(taxApp);
    }
  };

  const onRetryExport = (_event) => {
    setExportApp('');
    onAfterExport();
  };

  return (
    <>
      {exportStatus === ExportStatus.Idle && (
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Export</InputLabel>
          <Select value={exportApp} label="Export" onChange={onSelectApp}>
            <MenuItem key="regular" value="regular">
              Regular
            </MenuItem>
            {TAX_APPS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {exportStatus === ExportStatus.Processing && (
        <Button variant="outlined" disabled sx={{ minWidth: 100 }}>
          <img alt="parsing" src="/static/loading.gif" style={{ maxWidth: 30 }} />
          Preparing {exportApp} view
        </Button>
      )}

      {exportStatus === ExportStatus.Done && (
        <>
          <Link href={csvFileUrl} underline="none">
            <Button variant="contained" startIcon={<Icon icon={downloadFill} />}>
              Download
            </Button>
          </Link>
          <IconButton aria-label="try again" onClick={onRetryExport}>
            <RepeatIcon />
          </IconButton>
        </>
      )}
    </>
  );
}
