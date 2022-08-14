import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';

import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';
import useOnboardingEnabled from '@dashboard/modules/onboarding/hooks/useOnboardingEnabled';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { sleep } from '@dashboard/modules/utils/functions/functions';

function OnboardingInfoButton() {
  const { dispatch: layoutDispatch } = useLayout();
  const setOnboardingEnabled = useOnboardingEnabled()[1];
  const handleInfoButtonClick = () => {
    layoutDispatch({ type: 'setDrawerOpen', data: true });
    sleep(750).then(() => setOnboardingEnabled(true));
  };
  return (
    <IconButton
      id={onboardingStep(OnboardingSection.AppInfo)}
      onClick={handleInfoButtonClick}
    >
      <HelpIcon className="text-white" />
    </IconButton>
  );
}

export default OnboardingInfoButton;
