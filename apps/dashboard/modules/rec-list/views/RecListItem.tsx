import { useState } from 'react';
import { VegaLite } from 'react-vega';

import { RankedVisualization } from '@visrecly/ranking';

import RecDetail from '@dashboard/modules/rec-detail/views/RecDetail';

type RecListItemProps = {
  rank: number;
  rankedVisualization: RankedVisualization;
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function RecListItem({
  rank,
  rankedVisualization,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: RecListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className="flex justify-start items-center bg-white space-x-4 px-2 cursor-pointer rounded-md transition-all duration-300 hover:scale-[1.025] border-2 border-primary-700"
        onClick={handleClickOpen}
        css={{
          width: width,
          maxWidth: width,
          height: height,
          maxHeight: height,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RankIndicator rank={rank} />
        <ChartItem spec={rankedVisualization.vegaLiteSpec} />
      </div>
      <RecDetail
        open={isOpen}
        onClose={handleClose}
        rankedVisualization={rankedVisualization}
      />
    </>
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
    <div className="w-full h-full overflow-auto">
      <VegaLite spec={spec} actions={false} />
    </div>
  );
}

export default RecListItem;
