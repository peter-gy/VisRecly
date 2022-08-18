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

  const conditionalProps = {
    startIcon: visible ? <VisibilityOffIcon /> : <VisibilityIcon />,
  };

  return (
    <Button
      className="px-2"
      variant="contained"
      onClick={handleClick}
      {...((window ?? {})['safari'] === undefined && conditionalProps)}
    >
      {(window ?? {})['safari'] !== undefined && 'Show Options'}
      {(window ?? {})['safari'] === undefined &&
        (visible ? 'Hide Options' : 'Show Options')}
    </Button>
  );
}

export default VegaLiteExporter;
