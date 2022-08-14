import { TASKS, VisTask } from '@visrecly/vis-tasks';

import useHeatmapDimensions from '@dashboard/modules/heatmap/hooks/useHeatmapDimensions';
import HeatmapHeaderTile, {
  HeatmapHeaderTileProps,
} from '@dashboard/modules/heatmap/views/HeatmapHeaderTile';
import HeatmapSvg from '@dashboard/modules/heatmap/views/HeatmapSvg';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { useRecSelection } from '@dashboard/modules/rec-selection/provider/RecSelectionContext';

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
  const { dispatch: recSelectionDispatch } = useRecSelection();
  const handleTaskToggle = (taskName: VisTask['name']) => {
    recSelectionDispatch({
      type: 'toggleTask',
      data: taskName,
    });
  };

  const { tileWidth, tileHeight, numVisibleTiles } = useHeatmapDimensions();
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
