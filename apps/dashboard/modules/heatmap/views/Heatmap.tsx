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
import { initialRecInputState } from '@dashboard/modules/rec-input/beans/beans';
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
      className="flex bg-primary-200 overflow-auto"
    >
      <div
        style={{ marginTop: 0 }}
        className="bg-primary-200 sticky left-0 z-50"
      >
        {[...new Array(initialRecInputState.numMaxModels + 1).keys()].map(
          (idx) => {
            return (
              <div
                key={`rank-tile-${idx}`}
                style={{ height: tileHeight }}
                className="bg-primary-200"
              >
                {idx !== 0 && (
                  <div
                    style={{
                      minWidth: tileWidth / 3,
                      minHeight: tileHeight / 3,
                    }}
                    className="bg-primary-700 text-center flex justify-center items-center text-white mr-[-2px]"
                  >
                    {idx}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
      <div
        className="h-full w-full flex flex-col"
        style={{ maxWidth: numVisibleTiles * tileWidth }}
      >
        <div
          id={onboardingStep(OnboardingSection.HeatmapHeader)}
          className="flex sticky top-0 z-0"
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
    </div>
  );
}

export default Heatmap;
