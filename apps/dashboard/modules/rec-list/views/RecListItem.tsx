import { VegaLite } from 'react-vega';

import { RankedVisualization } from '@visrecly/ranking';

type RecListItemProps = {
  rank: number;
  rankedVisualization: RankedVisualization;
};

function RecListItem({
  rank,
  rankedVisualization: { vegaLiteSpec, dataOrientedCost, visTaskCosts },
}: RecListItemProps) {
  return (
    <div className="flex justify-start items-center bg-white space-x-4 px-2 cursor-pointer">
      <RankIndicator rank={rank} />
      <ChartItem spec={vegaLiteSpec} />
    </div>
  );
}

type RankIndicatorProps = {
  rank: number;
};

function RankIndicator({ rank }: RankIndicatorProps) {
  return (
    <div className="w-[40px] h-[40px] border-[1px] rounded-lg flex justify-center items-center">
      {rank}
    </div>
  );
}

type ChartItemProps = {
  spec: unknown;
};

function ChartItem({ spec }: ChartItemProps) {
  return (
    <div className="w-[175px] h-[175px] overflow-auto">
      <VegaLite spec={spec} actions={false} />
    </div>
  );
}

export default RecListItem;
