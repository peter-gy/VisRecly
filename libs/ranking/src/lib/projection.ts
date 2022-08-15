import { CostRange, RankedVisualization } from './types';
import { computeCostRange } from './utils';

/**
 * Constructs a function that can be used to linerarly project between ranges.
 *
 * @param originalMin - The minimum value of the original range.
 * @param originalMax - The maximum value of the original range.
 * @param projectedMin - The minimum value of the projected range.
 * @param projectedMax - The maximum value of the projected range.
 */
export function projector(
  originalMin: number,
  originalMax: number,
  projectedMin: number,
  projectedMax: number,
) {
  return (value: number) => {
    const originalRange = originalMax - originalMin;
    const projectedRange = projectedMax - projectedMin;
    return (
      (projectedRange * (value - originalMin)) / originalRange + projectedMin
    );
  };
}

export function projectCosts(
  visArray: RankedVisualization[],
  projectedRange: CostRange,
) {
  const { min: originalMin, max: originalMax } = computeCostRange(visArray);
  const { min: projectedMin, max: projectedMax } = projectedRange;
  const project = projector(
    originalMin,
    originalMax,
    projectedMin,
    projectedMax,
  );
  return visArray.map((vis) => projectCostsSingle(vis, project));
}

function projectCostsSingle(
  vis: RankedVisualization,
  projector: (value: number) => number,
): RankedVisualization {
  const dataOrientedCost = projector(vis.dataOrientedCost);
  const visTaskCosts = Object.keys(vis.visTaskCosts).reduce(
    (acc, curr) => ({ ...acc, [curr]: projector(vis.visTaskCosts[curr]) }),
    {},
  );
  const overallCost = projector(vis.overallCost);
  const aggregatedCosts = Object.keys(vis.aggregatedCosts).reduce(
    (acc, curr) => ({ ...acc, [curr]: projector(vis.aggregatedCosts[curr]) }),
    {},
  );
  return {
    ...vis,
    dataOrientedCost,
    visTaskCosts,
    overallCost,
    aggregatedCosts,
  };
}
