import { VisTask, VisTaskCostMap } from '@visrecly/vis-tasks';

import { CostRange, RankedVisualization } from './types';

/**
 * Computes the cost range for the supplied `visArray`, considering all costs
 * across all vis tasks.
 *
 * @param visArray - The array of visualization recommendations to rank.
 */
export function computeCostRange(visArray: RankedVisualization[]): CostRange {
  const costRanges = visArray.map(computeCostRangeSingle);
  return {
    min: Math.min(...costRanges.map(({ min }) => min)),
    max: Math.max(...costRanges.map(({ max }) => max)),
  };
}

function computeCostRangeSingle(vis: RankedVisualization): CostRange {
  return computeCostRangeSingleMap(vis.aggregatedCosts);
}

function computeCostRangeSingleMap(aggregatedCosts: VisTaskCostMap): CostRange {
  const values = Object.values(aggregatedCosts);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

export function mean(array: number[]) {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
}
