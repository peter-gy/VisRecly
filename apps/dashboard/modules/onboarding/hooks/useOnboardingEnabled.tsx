import useLocalStorage from '@dashboard/hooks/useLocalStorage';

function useOnboardingEnabled() {
  return useLocalStorage('onboardingEnabled', true);
}

export default useOnboardingEnabled;
