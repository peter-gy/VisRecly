import { useState } from 'react';
import { VegaLite } from 'react-vega';
import tw from 'twin.macro';

import { RankedVisualization } from '@visrecly/ranking';

import { colorScale } from '@dashboard/modules/heatmap/beans/scale';
import RecDetail from '@dashboard/modules/rec-detail/views/RecDetail';
import { recListItemId } from '@dashboard/modules/rec-list/utils/utils';
import { RecSelectionStatus } from '@dashboard/modules/rec-selection/types/types';

type RecListItemProps = {
  rank: number;
  rankedVisualization: RankedVisualization;
  width: number;
  height: number;
  selectionStatus: RecSelectionStatus;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const styles = {
  recListItem: ({
    width,
    height,
    selectionStatus,
  }: {
    width: number;
    height: number;
    selectionStatus: RecSelectionStatus;
  }) => [
    { width: width, maxWidth: width, height: height, maxHeight: height },
    tw`flex justify-start items-center bg-white space-x-4 px-2 cursor-pointer rounded-md`,
    tw`transition-all duration-300 border-2 border-primary-700`,
    selectionStatus === 'highlighted' && tw`scale-[1.00] border-primary-700`,
    selectionStatus === 'faded' &&
      tw`scale-[0.9] grayscale-[100%] opacity-[0.3]`,
  ],
};

function RecListItem({
  rank,
  rankedVisualization,
  width,
  height,
  selectionStatus,
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
  const rankColor = colorScale(rankedVisualization.overallCost);
  return (
    <>
      <div
        id={recListItemId(rank)}
        onClick={handleClickOpen}
        css={styles.recListItem({ width, height, selectionStatus })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RankIndicator rank={rank} backgroundColor={rankColor} />
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
  backgroundColor?: string;
};

function RankIndicator({
  rank,
  backgroundColor = 'transparent',
}: RankIndicatorProps) {
  return (
    <div
      className="w-[40px] h-[40px] border-[1px] rounded-lg flex justify-center items-center"
      style={{ backgroundColor }}
    >
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
