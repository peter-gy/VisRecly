import { Steps } from 'intro.js-react';

import { initialStep, steps } from '@dashboard/modules/onboarding/beans/beans';

function OnboardingElement() {
  const handleExit = () => {
    console.log('exit intro');
  };
  return (
    <>
      <Steps
        initialStep={initialStep}
        steps={steps}
        onExit={handleExit}
        enabled={true}
      />
    </>
  );
}

export default OnboardingElement;
