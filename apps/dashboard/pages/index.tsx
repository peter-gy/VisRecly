import dynamic from 'next/dynamic';

import MobileAppBody from '@dashboard/modules/app-body/views/MobileAppBody';
import SplashScreen from '@dashboard/modules/app-body/views/SplashScreen';
import MobileGate from '@dashboard/modules/layout/views/MobileGate';

const AppBody = dynamic(
  () => import('@dashboard/modules/app-body/views/AppBody'),
  { ssr: false, loading: () => <SplashScreen /> },
);

function App() {
  return (
    <MobileGate standardChild={<AppBody />} mobileChild={<MobileAppBody />} />
  );
}

export default App;
