import { createTheme } from '@mui/material';
import { theme } from 'twin.macro';

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
});

export default defaultTheme;
