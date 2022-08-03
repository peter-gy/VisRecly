// Code grabbed shamelessly from: https://github.com/mui/material-ui/issues/15798
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect in the browser.
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
