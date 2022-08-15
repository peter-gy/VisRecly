import {
  CostRange,
  RankedVisualization,
  RankedVisualizationExplicit,
} from '@visrecly/ranking';
import { VisTask, VisTaskCostMap } from '@visrecly/vis-tasks';

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

/**
 * Orders the supplied `visArray` based on the items' effectiveness
 * with regard to `taskName`.
 *
 * @param visArray - The array of visualization recommendations.
 * @param taskName - The name of the task to be ranked.
 */
export function rankVisualizationsForTask(
  visArray: RankedVisualization[],
  taskName: VisTask['name'],
) {
  return visArray.sort(
    (a, b) => a.aggregatedCosts[taskName] - b.aggregatedCosts[taskName],
  );
}
