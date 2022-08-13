import { useTheme } from '@mui/material/styles';

import useWindowSize from '@dashboard/hooks/useWindowSize';

function useLayoutDimensions() {
  const theme = useTheme();
  const { md, lg, xl } = theme.breakpoints.values;
  const { width: windowWidth } = useWindowSize();
  let drawerWidth: number;
  if (windowWidth >= xl) {
    drawerWidth = windowWidth / 4;
  } else if (windowWidth >= lg) {
    drawerWidth = windowWidth / 3;
  } else if (windowWidth >= md) {
    drawerWidth = windowWidth / 2;
  } else {
    drawerWidth = windowWidth;
  }
  const drawerShouldBeOpenInitially = windowWidth >= lg;
  return { drawerWidth, drawerShouldBeOpenInitially };
}

export default useLayoutDimensions;
