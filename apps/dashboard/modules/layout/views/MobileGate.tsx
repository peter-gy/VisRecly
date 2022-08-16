import { ReactNode } from 'react';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type MobileGateProps = {
  minWidth?: number;
  standardChild: ReactNode;
  mobileChild: ReactNode;
};

function MobileGate({ minWidth, standardChild, mobileChild }: MobileGateProps) {
  const theme = useTheme();
  const { lg } = theme.breakpoints.values;
  const _minWidth = minWidth ?? lg;
  const match = useMediaQuery(`(min-width: ${_minWidth}px)`);
  return <>{match ? standardChild : mobileChild}</>;
}

export default MobileGate;
