import HeatmapHeaderTile, { HeatmapHeaderTileProps } from './HeatmapHeaderTile';

type HeatmapProps = {
  headerTiles: Omit<HeatmapHeaderTileProps, 'onVisibilityChange'>[];
};

function Heatmap({ headerTiles }: HeatmapProps) {
  return (
    <div className="bg-green-300 h-full w-full flex flex-col overflow-auto">
      <div className="flex">
        {headerTiles.map(({ title, info }, idx) => (
          <HeatmapHeaderTile
            key={`heatmap-header-tile-${idx}`}
            title={title}
            info={info}
            onVisibilityChange={console.log}
          />
        ))}
      </div>
      <div className="grow bg-amber-500">Heatmap</div>
    </div>
  );
}

export default Heatmap;
