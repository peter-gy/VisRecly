import useTileDimensions from '@dashboard/modules/heatmap/hooks/useTileDimensions';
import HeatmapHeaderTile, {
  HeatmapHeaderTileProps,
} from '@dashboard/modules/heatmap/views/HeatmapHeaderTile';

type HeatmapProps = {
  headerTiles: Omit<HeatmapHeaderTileProps, 'onVisibilityChange'>[];
};

function Heatmap() {
  return (
    <_Heatmap
      headerTiles={[...Array(25).keys()].map((idx) => ({
        title: `Title ${idx + 1}`,
        info: {
          tooltip: `Tooltip ${idx + 1}`,
          title: `Info title ${idx + 1}`,
          description: `Description ${idx + 1}`,
        },
      }))}
    />
  );
}

function _Heatmap({ headerTiles }: HeatmapProps) {
  const { tileWidth, numVisibleTiles } = useTileDimensions();
  return (
    <div
      className="bg-green-300 h-full w-full flex flex-col overflow-auto"
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
          />
        ))}
      </div>
      <div className="grow flex">
        {headerTiles.map((_, idx) => (
          <div
            key={`heatmap-tile-${idx}`}
            className="border-l-2 border-black text-center"
            style={{ minWidth: tileWidth }}
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Heatmap;
