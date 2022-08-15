import { useEffect } from 'react';

import { TASKS, VisTask } from '@visrecly/vis-tasks';

import useHeatmapDimensions from '@dashboard/modules/heatmap/hooks/useHeatmapDimensions';
import { heatmapRectId } from '@dashboard/modules/heatmap/utils/utils';
import HeatmapHeaderTile, {
  HeatmapHeaderTileProps,
} from '@dashboard/modules/heatmap/views/HeatmapHeaderTile';
import HeatmapSvg from '@dashboard/modules/heatmap/views/HeatmapSvg';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { useRecSelection } from '@dashboard/modules/rec-selection/provider/RecSelectionContext';
import { isInViewport } from '@dashboard/modules/utils/functions/functions';

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
    state: { activeRec },
    dispatch: recSelectionDispatch,
  } = useRecSelection();
  const handleTaskToggle = (taskName: VisTask['name']) => {
    recSelectionDispatch({
      type: 'toggleTask',
      data: taskName,
    });
  };

  const { tileWidth, tileHeight, numVisibleTiles } = useHeatmapDimensions();

  const activeRank = activeRec?.overallRank;
  useEffect(() => {
    if (activeRank !== undefined) {
      const rectId = heatmapRectId(activeRank - 1, 0);
      const rectElement = document.getElementById(rectId);
      if (rectElement && !isInViewport(rectElement, -1.25 * tileHeight)) {
        rectElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeRank, tileHeight]);

  return (
    <div
      id={onboardingStep(OnboardingSection.Heatmap)}
      className="bg-primary-100 h-full w-full flex flex-col overflow-auto drop-shadow-2xl"
      style={{ maxWidth: numVisibleTiles * tileWidth }}
    >
      <div
        id={onboardingStep(OnboardingSection.HeatmapHeader)}
        className="flex"
      >
        {headerTiles.map(({ title, info }, idx) => (
          <HeatmapHeaderTile
            key={`heatmap-header-tile-${idx}`}
            title={title}
            info={info}
            width={tileWidth}
            height={tileHeight}
            onVisibilityChange={(_) => handleTaskToggle(title)}
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
