import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';

import { showVegaLiteExportOptions } from '@dashboard/modules/rec-detail/utils/utils';

function VegaLiteExporter() {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    showVegaLiteExportOptions();
    setVisible(!visible);
  };

  return (
    <Button
      className="px-2"
      variant="contained"
      startIcon={visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      onClick={handleClick}
    >
      {visible ? 'Hide Options' : 'Show Options'}
    </Button>
  );
}

export default VegaLiteExporter;
