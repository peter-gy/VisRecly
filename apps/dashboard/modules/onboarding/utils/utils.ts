export enum OnboardingSection {
  AppTitle = 'app-title',
  DataSetSelector = 'data-set-selector',
  DataColumnSelector = 'data-column-selector',
  RecList = 'rec-list',
  RecListItem = 'rec-list-item',
  HeatmapScale = 'heatmap-scale',
  Heatmap = 'heatmap',
  HeatmapHeader = 'heatmap-header',
  AppInfo = 'app-info',
}

export function onboardingStep(section: OnboardingSection): string {
  return `${section}`;
}
