import { Steps } from 'intro.js-react';
import { useEffect } from 'react';

import { initialStep, steps } from '@dashboard/modules/onboarding/beans/beans';
import useOnboardingEnabled from '@dashboard/modules/onboarding/hooks/useOnboardingEnabled';

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

  return (
    <>
      <Steps
        initialStep={initialStep}
        steps={steps}
        enabled={enabled}
        onExit={handleExit}
        onComplete={handleExit}
      />
    </>
  );
}

export default OnboardingElement;
