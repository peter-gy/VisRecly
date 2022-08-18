import { Steps } from 'intro.js-react';
import { useEffect } from 'react';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { initialStep, steps } from '@dashboard/modules/onboarding/beans/beans';
import useOnboardingEnabled from '@dashboard/modules/onboarding/hooks/useOnboardingEnabled';
import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';

function OnboardingElement() {
  const [enabled, setEnabled] = useOnboardingEnabled();
  const handleExit = () => {
    setEnabled(false, false);
  };

  useEffect(() => {
    const onStorageChange = () => {
      setEnabled(true, false);
    };
    window.addEventListener('storageChange', onStorageChange);
    return () => window.removeEventListener('storageChange', onStorageChange);
  }, [setEnabled]);

  // Display only if the drawer is not full sized
  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const atLeastMd = useMediaQuery(`(min-width: ${md}px)`);

  const {
    state: { isLoading },
  } = useRecOutput();
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Steps
        initialStep={initialStep}
        steps={steps}
        enabled={atLeastMd && enabled}
        onExit={handleExit}
        onComplete={handleExit}
        options={{ disableInteraction: true }}
      />
    </>
  );
}

export default OnboardingElement;
