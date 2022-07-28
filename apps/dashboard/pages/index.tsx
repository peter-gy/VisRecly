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
      className="bg-[red]"
    >
      <RecList />
    </div>
  );
};

export default App;
