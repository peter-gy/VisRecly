import { VisTask } from '@visrecly/vis-tasks';

/**
 * Heatmap column type.
 *
 * Using the name of a `VisTask` as the column type.
 * It can be used to index `RankedVisualization` properties
 * to access costs.
 */
export type ColumnType = VisTask['name'];

export type HeatmapCellState = 'normal' | 'highlighted' | 'faded';

/**
 * Heatmap tile (== cell == bin) type.
 *
 * Storing `rank` to be able to access a concrete `RankedVisualization`,
 * by indexing the sorted array in the shared state.
 */
export type BinType = {
  rank: number;
  cost: number;
  normalizedCost: number;
  state: HeatmapCellState;
};
