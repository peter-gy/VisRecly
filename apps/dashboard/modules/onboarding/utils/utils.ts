export enum OnboardingSection {
  AppTitle = 'app-title',
  DataSetSelector = 'data-set-selector',
  DataColumnSelector = 'data-column-selector',
  RecList = 'rec-list',
  RecListItem = 'rec-list-item',
  HeatmapScale = 'heatmap-scale',
  Heatmap = 'heatmap',
  HeatmapHeader = 'heatmap-header',
  HeatmapRankTile = 'heatmap-rank-tile',
  HeatmapHeaderTile = 'heatmap-header-tile',
  HeatmapTile = 'heatmap-rect-0-0',
  AppInfo = 'app-info',
  DrawerCloser = 'drawer-closer',
}

export function onboardingStep(section: OnboardingSection): string {
  return `${section}`;
}
