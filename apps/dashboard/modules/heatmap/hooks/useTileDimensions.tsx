import { useTheme } from '@mui/material/styles';

import useWindowSize from '@dashboard/hooks/useWindowSize';

/**
 * Determines the width of a heatmap tile
 * as well as the number of tiles in a row based on the window size.
 */
function useTileDimensions() {
  const theme = useTheme();
  const { md, lg, xl } = theme.breakpoints.values;
  const { width: windowWidth } = useWindowSize();
  const tileWidth = 80;
  let numVisibleTiles = 6;
  if (windowWidth >= xl) {
    numVisibleTiles = 10;
  } else if (windowWidth >= lg) {
    numVisibleTiles = 8;
  } else if (windowWidth >= md) {
    numVisibleTiles = 6;
  }
  return { tileWidth, numVisibleTiles };
}

export default useTileDimensions;
