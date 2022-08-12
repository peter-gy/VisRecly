import tw from 'twin.macro';

import DrawerContent from '@dashboard/modules/drawer/views/DrawerContent';
import Heatmap from '@dashboard/modules/heatmap/views/Heatmap';
import HeatmapScale from '@dashboard/modules/heatmap/views/HeatmapScale';
import useLayoutInfo from '@dashboard/modules/layout/hooks/useLayoutInfo';
import { LayoutInfo } from '@dashboard/modules/layout/types/types';
import LeftDrawerLayout from '@dashboard/modules/layout/views/LeftDrawerLayout';
import useRankingPipeline from '@dashboard/modules/ranking/hooks/useRankingPipeline';
import RecList from '@dashboard/modules/rec-list/views/RecList';

const App = () => {
  return (
    <LeftDrawerLayout
      title="Visrecly"
      mainContent={<MainContent />}
      drawerContent={<DrawerContent />}
    />
  );
};

const styles = {
  mainContainer: ({
    drawerOpen,
    mainContentWidth,
    appBarHeight,
  }: LayoutInfo) => [
    tw`bg-[red] flex`,
    { height: `calc(100vh - ${appBarHeight}px)`, marginTop: appBarHeight },
    !drawerOpen && tw`w-[100vw] max-w-[100vw]`,
    drawerOpen && { width: mainContentWidth, maxWidth: mainContentWidth },
  ],
  recListContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`flex flex-col justify-between items-center border-r-2 border-primary-600`,
    !drawerOpen && tw`w-[25vw] max-w-[25vw]`,
    drawerOpen && {
      width: 0.25 * mainContentWidth,
      maxWidth: 0.25 * mainContentWidth,
    },
  ],
  heatmapScaleContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`flex justify-center items-center bg-blue-400`,
  ],
  heatmapContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`ml-0 flex-grow flex justify-end`,
    !drawerOpen && tw`w-[70vw] max-w-[70vw]`,
    drawerOpen && {
      width: 0.65 * mainContentWidth,
      maxWidth: 0.65 * mainContentWidth,
    },
  ],
};

// Wrapper to handle layout normalization with the `appBarHeight`
function MainContent() {
  // Grab layout info for responsive styling
  const layoutInfo = useLayoutInfo();

  // Run pipeline automatically
  useRankingPipeline();

  return (
    <div css={styles.mainContainer(layoutInfo)}>
      <div css={styles.recListContainer(layoutInfo)}>
        <RecList />
      </div>
      <div css={styles.heatmapScaleContainer(layoutInfo)}>
        <HeatmapScale />
      </div>
      {/* Spacer */}
      <div className="flex-grow"></div>
      <div css={styles.heatmapContainer(layoutInfo)}>
        <Heatmap />
      </div>
    </div>
  );
}

export default App;
