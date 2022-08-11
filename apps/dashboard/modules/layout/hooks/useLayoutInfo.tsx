import useWindowSize from '@dashboard/hooks/useWindowSize';
import { useLayout } from '@dashboard/modules/layout/provider/LayoutContext';
import { LayoutInfo } from '@dashboard/modules/layout/types/types';

/**
 * Returns the responsive width of the main content, considering the
 * space occupied by the drawer if it is open.
 */
function useLayoutInfo(): LayoutInfo {
  const { width: windowWidth } = useWindowSize();
  const { state: layoutState } = useLayout();
  const { drawerOpen, drawerWidth } = layoutState;
  const mainContentWidth = windowWidth - (drawerOpen ? drawerWidth : 0);
  return { ...layoutState, mainContentWidth };
}

export default useLayoutInfo;
