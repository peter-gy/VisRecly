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
        items={[...Array(20).keys()].map((_) => (
          <div className="p-10 bg-[aliceblue]"></div>
        ))}
      />
    </div>
  );
};

export default App;
