import { HeatmapRect } from '@visx/heatmap';
import { scaleLinear } from '@visx/scale';

import { RankedVisualization } from '@visrecly/ranking';

import AlertMessage from '@dashboard/modules/components/alert-message/views/AlertMessage';
import LoadingIndicator from '@dashboard/modules/components/loading-indicator/views/LoadingIndicator';
import { colorScale } from '@dashboard/modules/heatmap/beans/scale';
import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';

type HeatmapSvgProps = {
  visArray: RankedVisualization[];
  tileWidth: number;
  tileHeight: number;
};

function HeatmapSvg({
  tileWidth,
  tileHeight,
}: Omit<HeatmapSvgProps, 'visArray'>) {
  const {
    state: { rankingResult },
  } = useRecOutput();
  if (rankingResult === undefined) {
    return <LoadingIndicator />;
  }
  if ('Error' in rankingResult) {
    return (
      <AlertMessage
        message="ASP Server Error - Please use a different data set"
        severity="error"
      />
    );
  }
  const visArray = rankingResult as RankedVisualization[];
  return (
    <_HeatmapSvg
      visArray={visArray}
      tileWidth={tileWidth}
      tileHeight={tileHeight}
    />
  );
}

function _HeatmapSvg({ visArray, tileWidth, tileHeight }: HeatmapSvgProps) {
  const visTaskNames = Object.keys(visArray[0].aggregatedCosts);

  // Number of columns
  const numTasks = visTaskNames.length;
  const width = numTasks * tileWidth;
  const xScale = scaleLinear({ domain: [0, numTasks], range: [0, width] });

  // Number of rows
  const numRecommendations = visArray.length;
  const height = numRecommendations * tileHeight;
  const yScale = scaleLinear({
    domain: [0, numRecommendations],
    range: [0, height],
  });

  return (
    <svg width={width} height={height} overflow="visible">
      <HeatmapRect
        data={visTaskNames}
        bins={(visTaskName) =>
          visArray.map(({ aggregatedCosts }) => aggregatedCosts[visTaskName])
        }
        xScale={xScale}
        yScale={yScale}
        binWidth={tileWidth}
        binHeight={tileHeight}
        colorScale={colorScale}
      >
        {(heatmap) =>
          heatmap.map((heatmapBins) =>
            heatmapBins.map((bin) => (
              <rect
                key={`heatmap-rect-${bin.row}-${bin.column}`}
                className="visx-heatmap-rect"
                width={bin.width}
                height={bin.height}
                x={bin.x}
                y={bin.y}
                fill={bin.color}
                fillOpacity={bin.opacity}
                onClick={() => {
                  const { row, column } = bin;
                  alert(JSON.stringify({ row, column, bin: bin.bin }));
                }}
              />
            )),
          )
        }
      </HeatmapRect>
    </svg>
  );
}

export default HeatmapSvg;
