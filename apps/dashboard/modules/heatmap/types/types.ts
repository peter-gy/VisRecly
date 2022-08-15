import { VisTask } from '@visrecly/vis-tasks';

import { RecSelectionStatus } from '@dashboard/modules/rec-selection/types/types';

/**
 * Heatmap column type.
 *
 * Using the name of a `VisTask` as the column type.
 * It can be used to index `RankedVisualization` properties
 * to access costs.
 */
export type ColumnType = VisTask['name'];

/**
 * Heatmap tile (== cell == bin) type.
 *
 * Storing `rank` to be able to access a concrete `RankedVisualization`,
 * by indexing the sorted array in the shared state.
 */
export type BinType = {
  overallRank: number;
  overallCost: number;
  overallCostNormalized: number;
  taskRank: number;
  taskCost: number;
  taskCostNormalized: number;
  selectionStatus: RecSelectionStatus;
};
