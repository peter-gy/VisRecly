import dynamic from 'next/dynamic';
import tw from 'twin.macro';

import MobileAppBody from '@dashboard/modules/app-body/views/MobileAppBody';
import DrawerContent from '@dashboard/modules/drawer/views/DrawerContent';
import Heatmap from '@dashboard/modules/heatmap/views/Heatmap';
import HeatmapScale from '@dashboard/modules/heatmap/views/HeatmapScale';
import useLayoutInfo from '@dashboard/modules/layout/hooks/useLayoutInfo';
import { LayoutInfo } from '@dashboard/modules/layout/types/types';
import LeftDrawerLayout from '@dashboard/modules/layout/views/LeftDrawerLayout';
import MobileGate from '@dashboard/modules/layout/views/MobileGate';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import RankingServiceComponent from '@dashboard/modules/ranking/views/RankingServiceComponent';
import RecList from '@dashboard/modules/rec-list/views/RecList';

const OnboardingElement = dynamic(
  () => import('@dashboard/modules/onboarding/views/OnboardingElement'),
  { ssr: false },
);

function AppBody() {
  return (
    <MobileGate standardChild={<_AppBody />} mobileChild={<MobileAppBody />} />
  );
}

function _AppBody() {
  return (
    <>
      <RankingServiceComponent />
      <LeftDrawerLayout
        title="VisRecly"
        mainContent={<MainContent />}
        drawerContent={<DrawerContent />}
      />
    </>
  );
}

const styles = {
  mainContainer: ({
    drawerOpen,
    mainContentWidth,
    appBarHeight,
  }: LayoutInfo) => [
    tw`bg-primary-200 flex`,
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
    tw`bg-primary-200 hidden md:flex md:justify-center md:items-center`,
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

function MainContent() {
  // Grab layout info for responsive styling
  const layoutInfo = useLayoutInfo();

  return (
    <>
      <OnboardingElement />
      <div css={styles.mainContainer(layoutInfo)}>
        <div
          id={onboardingStep(OnboardingSection.RecList)}
          css={styles.recListContainer(layoutInfo)}
        >
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
    </>
  );
}

export default AppBody;
