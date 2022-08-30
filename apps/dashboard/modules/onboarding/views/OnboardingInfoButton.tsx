import HelpIcon from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';
import useOnboardingEnabled from '@dashboard/modules/onboarding/hooks/useOnboardingEnabled';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { sleep } from '@dashboard/modules/utils/functions/functions';

function OnboardingInfoButton() {
  const {
    state: { drawerOpen },
    dispatch: layoutDispatch,
  } = useLayout();
  const setOnboardingEnabled = useOnboardingEnabled()[1];
  const handleInfoButtonClick = () => {
    if (!drawerOpen) {
      layoutDispatch({ type: 'setDrawerOpen', data: true });
      sleep(750).then(() => setOnboardingEnabled(true));
    } else {
      setOnboardingEnabled(true);
    }
  };
  return (
    <Tooltip title="Go through the onboarding again">
      <IconButton
        id={onboardingStep(OnboardingSection.AppInfo)}
        onClick={handleInfoButtonClick}
        aria-label="Show onboarding steps"
      >
        <HelpIcon className="text-white" />
      </IconButton>
    </Tooltip>
  );
}

export default OnboardingInfoButton;
