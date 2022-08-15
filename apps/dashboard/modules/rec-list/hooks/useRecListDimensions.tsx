import { useTheme } from '@mui/material';

import useLayoutInfo from '@dashboard/modules/layout/hooks/useLayoutInfo';

function useRecListDimensions() {
  const theme = useTheme();
  const { lg } = theme.breakpoints.values;
  const { drawerOpen, windowWidth, mainContentWidth } = useLayoutInfo();
  const recListWidth = drawerOpen
    ? 0.25 * mainContentWidth
    : 0.25 * windowWidth;
  const recListItemWidth =
    windowWidth < lg ? 0.6 * recListWidth : 0.75 * recListWidth;
  const recListItemHeight = 0.45 * recListWidth;
  return { recListWidth, recListItemWidth, recListItemHeight };
}

export default useRecListDimensions;
