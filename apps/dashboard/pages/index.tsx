import tw from 'twin.macro';

import DrawerContent from '@dashboard/modules/drawer/views/DrawerContent';
import Heatmap from '@dashboard/modules/heatmap/views/Heatmap';
import HeatmapScale from '@dashboard/modules/heatmap/views/HeatmapScale';
import useMainContentWidth from '@dashboard/modules/layout/hooks/useMainContentWidth';
import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';
import LeftDrawerLayout from '@dashboard/modules/layout/views/LeftDrawerLayout';
import useRankingPipeline from '@dashboard/modules/ranking/hooks/useRankingPipeline';
import RecList from '@dashboard/modules/rec-list/views/RecList';

const App = () => {
  return (
    <LeftDrawerLayout
      title="Visrecly"
      mainContent={MainContent}
      drawerContent={<DrawerContent />}
    />
  );
};

type LayoutInfo = {
  drawerOpen: boolean;
  mainContentWidth: number;
};

const styles = {
  recListContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`flex flex-col justify-between items-center border-r-2 border-primary-600`,
  ],
  heatmapScaleContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`flex justify-center items-center bg-blue-400`,
  ],
  heatmapContainer: ({ drawerOpen, mainContentWidth }: LayoutInfo) => [
    tw`ml-12 flex-grow flex justify-end`,
  ],
};

// Wrapper to handle layout normalization with the `appBarHeight`
const MainContent = (appBarHeight: number) => {
  const {
    state: { drawerOpen },
  } = useLayout();
  const mainContentWidth = useMainContentWidth();
  useRankingPipeline();
  return (
    <div
      css={{
        height: 'calc(100vh - ' + appBarHeight + 'px)',
        width: '100vw',
        marginTop: appBarHeight,
      }}
      className="bg-[red] flex"
    >
      <div css={styles.recListContainer({ drawerOpen, mainContentWidth })}>
        <RecList />
      </div>
      <div css={styles.heatmapScaleContainer({ drawerOpen, mainContentWidth })}>
        <HeatmapScale />
      </div>
      <div css={styles.heatmapContainer({ drawerOpen, mainContentWidth })}>
        <Heatmap />
      </div>
    </div>
  );
};

export default App;
