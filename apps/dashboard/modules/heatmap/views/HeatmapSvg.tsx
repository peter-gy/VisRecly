import { HeatmapRect } from '@visx/heatmap';
import { scaleLinear } from '@visx/scale';
import { useState } from 'react';

import { RankedVisualization } from '@visrecly/ranking';

import AlertMessage from '@dashboard/modules/components/alert-message/views/AlertMessage';
import LoadingIndicator from '@dashboard/modules/components/loading-indicator/views/LoadingIndicator';
import { colorScale } from '@dashboard/modules/heatmap/beans/scale';
import { BinType, ColumnType } from '@dashboard/modules/heatmap/types/types';
import {
  binsFromVisArray,
  columnsFromVisArray,
} from '@dashboard/modules/heatmap/utils/utils';
import RecDetail from '@dashboard/modules/rec-detail/views/RecDetail';
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
    return (
      <div className="h-full w-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
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
  const [selectedVis, setSelectedVis] = useState<RankedVisualization | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const handleClose = () => {
    setDetailOpen(false);
  };

  const visTaskNames = columnsFromVisArray(visArray);

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
    <>
      <svg width={width} height={height} overflow="visible">
        <HeatmapRect<ColumnType, BinType>
          data={visTaskNames}
          bins={binsFromVisArray(visArray)}
          xScale={xScale}
          yScale={yScale}
          binWidth={tileWidth}
          binHeight={tileHeight}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="visx-heatmap-rect cursor-pointer transition-all duration-300 hover:stroke-2 hover:stroke-primary-900"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={colorScale(bin.bin.cost)}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    const {
                      bin: { rank },
                    } = bin;
                    const vis = visArray[rank];
                    setSelectedVis(vis);
                    setDetailOpen(true);
                  }}
                />
              )),
            )
          }
        </HeatmapRect>
      </svg>
      {selectedVis !== null && (
        <RecDetail
          open={detailOpen}
          onClose={handleClose}
          rankedVisualization={selectedVis}
        />
      )}
    </>
  );
}

export default HeatmapSvg;
