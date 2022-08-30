import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

import SplashScreen from '@dashboard/modules/app-body/views/SplashScreen';

const AppBody = dynamic(
  () => import('@dashboard/modules/app-body/views/AppBody'),
  { ssr: false, loading: () => <SplashScreen /> },
);

function App() {
  return (
    <>
      <NextSeo
        title="VisRecly"
        description="📊 A task-based visualization recommendation app, aiming to be the Grammarly for stories written with visualizations."
        canonical={'https://visrecly.vercel.app'}
        openGraph={{
          url: 'https://visrecly.vercel.app',
          title: 'VisRecly',
          description:
            '📊 A task-based visualization recommendation app, aiming to be the Grammarly for stories written with visualizations.',
          site_name: 'VisRecly',
        }}
      />
      <AppBody />
    </>
  );
}

export default App;
