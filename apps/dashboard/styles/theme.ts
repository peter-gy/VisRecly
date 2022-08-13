import { theme } from 'twin.macro';

import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: +theme`screens.xs`.replace('px', ''),
      sm: +theme`screens.sm`.replace('px', ''),
      md: +theme`screens.md`.replace('px', ''),
      lg: +theme`screens.lg`.replace('px', ''),
      xl: +theme`screens.xl`.replace('px', ''),
    },
  },
  palette: {
    primary: {
      main: theme`colors.primary.DEFAULT`,
      '50': theme`colors.primary.50`,
      '100': theme`colors.primary.100`,
      '200': theme`colors.primary.200`,
      '300': theme`colors.primary.300`,
      '400': theme`colors.primary.400`,
      '500': theme`colors.primary.500`,
      '600': theme`colors.primary.600`,
      '700': theme`colors.primary.700`,
      '800': theme`colors.primary.800`,
      '900': theme`colors.primary.900`,
    },
  },
});

export default defaultTheme;
