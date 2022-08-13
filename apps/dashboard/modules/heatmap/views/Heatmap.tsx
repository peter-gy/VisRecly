import { TASKS } from '@visrecly/vis-tasks';

import useHeatmapDimensions from '@dashboard/modules/heatmap/hooks/useHeatmapDimensions';
import HeatmapHeaderTile, {
  HeatmapHeaderTileProps,
} from '@dashboard/modules/heatmap/views/HeatmapHeaderTile';
import HeatmapSvg from '@dashboard/modules/heatmap/views/HeatmapSvg';

type HeatmapProps = {
  headerTiles: Omit<HeatmapHeaderTileProps, 'onVisibilityChange'>[];
};

function Heatmap() {
  const headerTiles = TASKS.map(
    ({ name, descriptionShort, descriptionLong }) => ({
      title: name,
      info: {
        title: name,
        tooltip: descriptionShort,
        description: descriptionLong.content,
      },
    }),
  );
  return <_Heatmap headerTiles={headerTiles} />;
}

function _Heatmap({ headerTiles }: HeatmapProps) {
  const {
    tileWidth,
    tileHeight,
    numVisibleTiles,
    heatmapWidth,
    heatmapHeight,
  } = useHeatmapDimensions();
  return (
    <div
      className="bg-primary-100 h-full w-full flex flex-col overflow-auto drop-shadow-2xl"
      style={{ maxWidth: numVisibleTiles * tileWidth }}
    >
      <div className="flex">
        {headerTiles.map(({ title, info }, idx) => (
          <HeatmapHeaderTile
            key={`heatmap-header-tile-${idx}`}
            title={title}
            info={info}
            onVisibilityChange={console.log}
            width={tileWidth}
            height={tileHeight}
          />
        ))}
      </div>
      <div className="grow flex">
        <HeatmapSvg tileWidth={tileWidth} tileHeight={tileHeight} />
      </div>
    </div>
  );
}

export default Heatmap;
