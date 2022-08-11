import useWindowSize from '@dashboard/hooks/useWindowSize';
import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';

/**
 * Returns the responsive width of the main content, considering the
 * space occupied by the drawer if it is open.
 */
function useMainContentWidth() {
  const { width: windowWidth } = useWindowSize();
  const {
    state: { drawerOpen, drawerWidth },
  } = useLayout();
  return windowWidth - (drawerOpen ? drawerWidth : 0);
}

export default useMainContentWidth;
