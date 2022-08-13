import { RankedVisualization } from '@visrecly/ranking';

import { normalizeCost } from '@dashboard/modules/heatmap/beans/scale';
import { ColumnType } from '@dashboard/modules/heatmap/types/types';

export function columnsFromVisArray(
  visArray: RankedVisualization[],
): ColumnType[] {
  return Object.keys(visArray[0].aggregatedCosts);
}

export function binsFromVisArray(visArray: RankedVisualization[]) {
  return (visTaskName) =>
    visArray.map(({ aggregatedCosts }, idx) => ({
      idx,
      cost: aggregatedCosts[visTaskName],
      normalizedCost: normalizeCost(aggregatedCosts[visTaskName]),
    }));
}
