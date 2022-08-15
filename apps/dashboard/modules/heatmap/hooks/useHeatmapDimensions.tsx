import { TASKS } from '@visrecly/vis-tasks';

import useLayoutInfo from '@dashboard/modules/layout/hooks/useLayoutInfo';

function useHeatmapDimensions() {
  const {
    windowWidth,
    windowHeight,
    appBarHeight,
    mainContentWidth,
    drawerOpen,
  } = useLayoutInfo();
  const [tileWidth, tileHeight] = [80, 80];
  const heatmapWidth = drawerOpen
    ? 0.65 * mainContentWidth
    : 0.675 * windowWidth;
  const heatmapHeight = windowHeight - appBarHeight - tileHeight;
  const numMaxTiles = TASKS.length;
  const numVisibleTiles = Math.min(
    Math.floor(heatmapWidth / tileWidth),
    numMaxTiles,
  );
  return {
    tileWidth,
    tileHeight,
    numVisibleTiles,
    heatmapWidth,
    heatmapHeight,
  };
}

export default useHeatmapDimensions;
