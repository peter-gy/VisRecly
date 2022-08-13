import { useTheme } from '@mui/material/styles';

import useLayoutInfo from '@dashboard/modules/layout/hooks/useLayoutInfo';

function useHeatmapDimensions() {
  const theme = useTheme();
  const {
    windowWidth,
    windowHeight,
    appBarHeight,
    mainContentWidth,
    drawerOpen,
  } = useLayoutInfo();
  const { md, lg, xl } = theme.breakpoints.values;
  const [tileWidth, tileHeight] = [80, 80];
  let numVisibleTiles = 6;
  if (windowWidth >= xl) {
    numVisibleTiles = 14;
  } else if (windowWidth >= lg) {
    numVisibleTiles = 10;
  } else if (windowWidth >= md) {
    numVisibleTiles = 6;
  }
  const heatmapWidth = drawerOpen ? 0.65 * mainContentWidth : 0.7 * windowWidth;
  const heatmapHeight = windowHeight - appBarHeight - tileHeight;
  return {
    tileWidth,
    tileHeight,
    numVisibleTiles,
    heatmapWidth,
    heatmapHeight,
  };
}

export default useHeatmapDimensions;
