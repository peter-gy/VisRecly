/**
 * Describes the state of the app's main layout.
 */
export type LayoutState = {
  /**
   * Current width of the browser window.
   */
  windowWidth: number;

  /**
   * Current height of the browser window.
   */
  windowHeight: number;

  /**
   * Indicates whether the side drawer is open.
   */
  drawerOpen: boolean;

  /**
   * The responsive drawer width.
   */
  drawerWidth: number;

  /**
   * The responsive app bar height.
   */
  appBarHeight: number;
};

export type LayoutInfo = LayoutState & {
  /**
   * The responsive main content width.
   */
  mainContentWidth: number;
};
