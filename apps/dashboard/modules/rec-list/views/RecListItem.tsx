import { useState } from 'react';
import { VegaLite } from 'react-vega';
import tw from 'twin.macro';

import { RankedVisualizationExplicit } from '@visrecly/ranking';

import { colorScale } from '@dashboard/modules/heatmap/beans/scale';
import RecDetail from '@dashboard/modules/rec-detail/views/RecDetail';
import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';
import {
  recListItemId,
  vegaSpecPatch,
} from '@dashboard/modules/rec-list/utils/utils';
import { RecSelectionStatus } from '@dashboard/modules/rec-selection/types/types';

type RecListItemProps = {
  rank: number;
  rankedVisualization: RankedVisualizationExplicit;
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
  const {
    state: { selectedDataColumns },
  } = useRecInput();
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
        <ChartItem
          spec={rankedVisualization.vegaLiteSpec}
          width={0.6 * width}
          height={0.6 * height}
        />
      </div>
      <RecDetail
        open={isOpen}
        onClose={handleClose}
        rankedVisualization={rankedVisualization}
        selectedColumnNames={selectedDataColumns.map(({ name }) => name)}
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
      className="w-[40px] h-[40px] border-[1px] rounded-lg flex justify-center items-center flex-grow lg:flex-grow-0"
      style={{ backgroundColor }}
    >
      {rank}
    </div>
  );
}

type ChartItemProps = {
  spec: unknown;
  width: number;
  height: number;
};

function ChartItem({ spec, width, height }: ChartItemProps) {
  return (
    <div className="hidden lg:w-full lg:h-full lg:overflow-auto lg:flex lg:items-center lg:justify-center">
      <VegaLite
        spec={spec}
        actions={false}
        patch={vegaSpecPatch}
        width={width}
        height={height}
      />
    </div>
  );
}

export default RecListItem;
