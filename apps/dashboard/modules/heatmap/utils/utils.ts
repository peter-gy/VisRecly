import { RankedVisualization } from '@visrecly/ranking';

import { normalizeCost } from '@dashboard/modules/heatmap/beans/scale';
import { BinType, ColumnType } from '@dashboard/modules/heatmap/types/types';
import { RecSelectionState } from '@dashboard/modules/rec-selection/types/types';
import { determineSelectionStatus } from '@dashboard/modules/rec-selection/utils/utils';

export function columnsFromVisArray(
  visArray: RankedVisualization[],
): ColumnType[] {
  return Object.keys(visArray[0].aggregatedCosts);
}

export function binsFromVisArray(
  visArray: RankedVisualization[],
  recSelectionState: RecSelectionState,
) {
  const { activeRec, activeTasks } = recSelectionState;
  return (visTaskName) =>
    visArray.map<BinType>((rec, idx) => {
      const selectionStatus = activeTasks.includes(visTaskName)
        ? determineSelectionStatus(activeRec, { ...rec, rank: idx })
        : 'faded';
      return {
        rank: idx,
        cost: rec.aggregatedCosts[visTaskName],
        normalizedCost: normalizeCost(rec.aggregatedCosts[visTaskName]),
        selectionStatus: selectionStatus,
      };
    });
}

export function heatmapRectId(row: number, column: number) {
  return `heatmap-rect-${row}-${column}`;
}
