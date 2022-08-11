import DrawerContent from '@dashboard/modules/drawer/views/DrawerContent';
import Heatmap from '@dashboard/modules/heatmap/views/Heatmap';
import HeatmapScale from '@dashboard/modules/heatmap/views/HeatmapScale';
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

// Wrapper to handle layout normalization with the `appBarHeight`
const MainContent = (appBarHeight: number) => {
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
      <RecList />
      <div className="flex justify-center items-center bg-blue-400">
        <HeatmapScale />
      </div>
      <div className="ml-12 bg-amber-200 grow max-w-[70vw] flex justify-end">
        <Heatmap
          headerTiles={[...Array(25).keys()].map((idx) => ({
            title: `Title ${idx + 1}`,
            info: {
              tooltip: `Tooltip ${idx + 1}`,
              title: `Info title ${idx + 1}`,
              description: `Description ${idx + 1}`,
            },
          }))}
        />
      </div>
    </div>
  );
};

export default App;
