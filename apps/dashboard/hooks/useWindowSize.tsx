// This hook is based on the following article: https://usehooks.com/useWindowSize/
import { useEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({ width: 0, height: 0 });
  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    // Set the initial size
    handleResize();
    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []); // No dependencies -> runs only on mount
  return windowSize;
}

export default useWindowSize;
