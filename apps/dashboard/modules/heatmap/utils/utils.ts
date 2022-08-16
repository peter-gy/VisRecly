import { RankedVisualizationExplicit } from '@visrecly/ranking';

import { normalizeCost } from '@dashboard/modules/heatmap/beans/scale';
import { BinType, ColumnType } from '@dashboard/modules/heatmap/types/types';
import { RecSelectionState } from '@dashboard/modules/rec-selection/types/types';
import { determineSelectionStatus } from '@dashboard/modules/rec-selection/utils/utils';

export function columnsFromVisArray(
  visArray: RankedVisualizationExplicit[],
): ColumnType[] {
  return Object.keys(visArray[0].aggregatedCosts);
}

export function binsFromVisArray(
  visArray: RankedVisualizationExplicit[],
  recSelectionState: RecSelectionState,
) {
  const { activeRec, activeTasks } = recSelectionState;
  return (visTaskName) =>
    visArray
      .map<BinType>((rec) => {
        const selectionStatus = activeTasks.includes(visTaskName)
          ? determineSelectionStatus(activeRec, rec)
          : 'ignored';
        return {
          overallRank: rec.overallRank,
          overallCost: rec.overallCost,
          overallCostNormalized: normalizeCost(rec.overallCost),
          taskRank: rec.visTaskRankMap[visTaskName],
          taskCost: rec.visTaskCosts[visTaskName],
          taskCostNormalized: normalizeCost(rec.visTaskCosts[visTaskName]),
          selectionStatus: selectionStatus,
        };
      })
      .sort((a, b) => a.taskRank - b.taskRank);
}

export function heatmapRectId(row: number, column: number) {
  return `heatmap-rect-${row}-${column}`;
}
