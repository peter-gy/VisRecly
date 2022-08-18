import { RankedVisualizationExplicit } from '@visrecly/ranking';
import { VisTask } from '@visrecly/vis-tasks';

export function topPerformingTasksOfVis(
  vis: RankedVisualizationExplicit,
  top = 3,
): VisTask['name'][] {
  return Object.keys(vis.visTaskRankMap)
    .sort((a, b) => vis.visTaskRankMap[a] - vis.visTaskRankMap[b])
    .splice(0, top);
}

export function showVegaLiteExportOptions() {
  const menuElement = document.querySelector(
    '.vega-embed.has-actions summary',
  ) as HTMLAnchorElement;
  menuElement.click();
}
