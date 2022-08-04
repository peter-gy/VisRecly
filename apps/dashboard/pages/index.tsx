import Heatmap from '../modules/heatmap/views/Heatmap';
import HeatmapScale from '../modules/heatmap/views/HeatmapScale';
import LeftDrawerLayout from '../modules/layout/LeftDrawerLayout';
import RecList from '../modules/rec-list/views/RecList';

const App = () => {
  return <LeftDrawerLayout title="Visrecly" mainContent={MainContent} />;
};

// Wrapper to handle layout normalization with the `appBarHeight`
const MainContent = (appBarHeight: number) => {
  return (
    <div
      css={{
        height: 'calc(100vh - ' + appBarHeight + 'px)',
        width: '100vw',
        marginTop: appBarHeight,
      }}
      className="bg-[red] flex"
    >
      <RecList
        items={[...Array(20).keys()].map((idx) => (
          <div className="p-10 bg-[aliceblue]">{idx + 1}</div>
        ))}
      />
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
