import dynamic from 'next/dynamic';

import SplashScreen from '@dashboard/modules/app-body/views/SplashScreen';

const AppBody = dynamic(
  () => import('@dashboard/modules/app-body/views/AppBody'),
  { ssr: false, loading: () => <SplashScreen /> },
);

function App() {
  return <AppBody />;
}

export default App;
