import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';

import useOnboardingEnabled from '@dashboard/modules/onboarding/hooks/useOnboardingEnabled';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';

function OnboardingInfoButton() {
  const setOnboardingEnabled = useOnboardingEnabled()[1];
  const handleInfoButtonClick = () => {
    setOnboardingEnabled(true);
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
