import useLayoutDimensions from '@dashboard/modules/layout/hooks/useLayoutDimensions';
import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';

/**
 * Returns the responsive width of the main content, considering the
 * space occupied by the drawer if it is open.
 */
function useMainContentWidth() {
  const { remainingWidth } = useLayoutDimensions();
  const {
    state: { drawerOpen, drawerWidth },
  } = useLayout();
  return remainingWidth - (drawerOpen ? drawerWidth : 0);
}

export default useMainContentWidth;
