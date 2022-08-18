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

const pinger = `
<span class="flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
</span>
`;

export function showVegaLiteExportOptions() {
  const details = document.querySelector(
    '.vega-embed.has-actions details ',
  ) as HTMLDetailsElement;
  const isSafari = window['safari'] !== undefined;
  if (!isSafari) {
    details.toggleAttribute('open');
    return;
  }
  const summary = document.querySelector(
    '.vega-embed.has-actions summary ',
  ) as HTMLElement;
  const pingerDiv = document.getElementById('pinger') as HTMLDivElement | null;

  details.addEventListener('toggle', () => {
    if (details.open) {
      document.getElementById('pinger')?.remove();
    }
  });

  if (pingerDiv !== null) {
    document.getElementById('pinger').remove();
  } else {
    const pingerRoot = document.createElement('div');
    pingerRoot.id = 'pinger';
    pingerRoot.innerHTML = pinger;
    summary.focus();
    summary.prepend(pingerRoot);
  }
}
