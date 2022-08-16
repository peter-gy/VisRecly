import { ClingoError } from 'clingo-wasm';

import {
  Draco,
  SolutionSet,
  ZippedSolutionSetElement,
  solutionSetToZippedElements,
} from '@visrecly/draco-web';
import {
  TASK_MAP,
  VegaLiteAnyMark,
  VisTask,
  VisTaskCostMap,
  VisTaskMap,
} from '@visrecly/vis-tasks';

import { encodingPrefsToAsp } from './encodingPreferences';
import { projectCosts } from './projection';
import {
  RankedVisualization,
  RankedVisualizationExplicit,
  VisTaskRankMap,
} from './types';
import { mean } from './utils';

/**
 * Top-level function to generate and rank visualizations
 * from the supplied `dataSet` under the consideration of encoding preferences,
 * that is, which columns of `dataSet` should be encoded during the VisRec.
 *
 * @param draco - The `Draco` instance to handle VisRec.
 * @param encodingPrefs - A list of the column names of the data set that should be visualized.
 * @param numMaxModels - The maximum number of models to return. Gets passed to Clingo under the hood.
 * @param relaxHard - Whether the hard constraints should be relaxed.
 * @param costProjectionConfig - Configuration for the cost projection, used to normalize the range of costs.
 * @param visTaskMap - The map of visualization tasks to consider when ranking.
 */
export async function rank(
  draco: Draco,
  encodingPrefs: string[],
  numMaxModels = 10,
  relaxHard = false,
  costProjectionConfig: { min: number; max: number } = { min: 0, max: 10 },
  visTaskMap: VisTaskMap = TASK_MAP,
) {
  // Extend the core ASP of Draco by encoding declarations
  const program = encodingPrefsToAsp(encodingPrefs);
  const solutionOrError = await draco.solve(program, {
    models: numMaxModels,
    relaxHard,
  });
  const isError = 'Error' in solutionOrError;
  if (isError) {
    return solutionOrError as ClingoError;
  }

  // Access the `SolutionSet` and return the elements with ranks assigned
  const solution = solutionOrError as SolutionSet;
  const elements = solutionSetToZippedElements(solution);
  const elementsWithCosts = elements.map((element) =>
    computeSingleElementCost(element, visTaskMap),
  );
  const projectedElements = projectCosts(
    elementsWithCosts,
    costProjectionConfig,
  );
  return projectedElements
    .sort(compareVisualizations)
    .map<RankedVisualizationExplicit>((e, idx) => ({
      ...e,
      overallRank: idx + 1,
      visTaskRankMap: computeVisTaskRankMap(e, projectedElements),
    }));
}

/**
 * Compares two ranked visualizations based on their cost.
 * Used to custom sort elements to create a ranking.
 *
 * Serves to sort costs in ascending order,
 * lower costs indicating better results.
 *
 * @param a - The first ranked visualization.
 * @param b - The second ranked visualization.
 */
function compareVisualizations(a: RankedVisualization, b: RankedVisualization) {
  return a.overallCost - b.overallCost;
}

/**
 * Computes the global ranking of visualizations per task.
 *
 * @param vis - The vis to compute the global task ranks for.
 * @param visArray - The array of ranked visualizations.
 */
function computeVisTaskRankMap(
  vis: RankedVisualization,
  visArray: RankedVisualization[],
): VisTaskRankMap {
  const taskNames = Object.keys(vis.visTaskCosts) as VisTask['name'][];
  return taskNames.reduce((obj, taskName) => {
    const costs = taskCosts(taskName, visArray);
    const idx = costs.indexOf(vis.visTaskCosts[taskName]);
    const rank = idx + 1;
    return { ...obj, [taskName]: rank };
  }, {});
}

function taskCosts(
  taskName: VisTask['name'],
  visArray: RankedVisualization[],
): number[] {
  return visArray
    .map((vis) => vis.visTaskCosts[taskName])
    .sort((a, b) => a - b);
}

/**
 * Computes the local ranking of a visualization per task.
 *
 * @param aggregatedCosts - The aggregated cost map of a recommendation.
 */
function computeVisTaskRankMapLocal(
  aggregatedCosts: VisTaskCostMap,
): VisTaskRankMap {
  return Object.entries(aggregatedCosts)
    .sort((a, b) => a[1] - b[1])
    .map((e, idx) => [e[0], idx])
    .reduce(
      (obj, [visTaskName, idx]) => ({
        ...obj,
        [visTaskName]: (idx as number) + 1,
      }),
      {},
    );
}

/**
 * Computes the costs of a single visualization from a raw solution set element.
 * Constructs and returns client-friendlier `RankedVisualization` object.
 *
 * @param element - the solution set element to compute the cost of.
 * @param visTaskMap - The map of visualization tasks used to compute task-based costs.
 */
function computeSingleElementCost(
  element: ZippedSolutionSetElement,
  visTaskMap: VisTaskMap,
): RankedVisualization {
  const { model, vegaLiteSpec } = element;
  const dataOrientedCost = model.costs[0];
  // Get the mark to compute task-based preferences
  const mark = vegaLiteSpec.mark as VegaLiteAnyMark;
  // Compute the cost map based on the used mark, & return the ranked element
  const visTaskCosts = computeVisTaskCostMap(mark, visTaskMap);
  const aggregatedCosts = computeAggregatedCostMap(
    visTaskCosts,
    dataOrientedCost,
  );
  const visTaskRankMapLocal = computeVisTaskRankMapLocal(aggregatedCosts);
  const overallCost = computeOverallCost(dataOrientedCost, visTaskCosts);
  return {
    vegaLiteSpec,
    dataOrientedCost,
    visTaskCosts,
    visTaskRankMapLocal,
    aggregatedCosts,
    overallCost,
  };
}

/**
 * Computes the overall cost of a visualization
 * by summing the `dataOrientedCost` with the average of the `visTaskCosts`.

 * @param dataOrientedCost - The data-oriented cost.
 * @param visTaskCosts - Raw task-oriented costs.
 */
function computeOverallCost(
  dataOrientedCost: number,
  visTaskCosts: VisTaskCostMap,
) {
  const averageVisTaskCost = mean(Object.values(visTaskCosts));
  return dataOrientedCost + averageVisTaskCost;
}

/**
 * Computes the cost map for a visualization based on the mark used.
 *
 * Subtracts the cost of the favored task preferences
 * from the cost of the disfavored task preferences.
 *
 * The fact that only the `mark` of the visualization is used to compute
 * task-based costs is a notable shortcoming of the current implementation.
 *
 * @param mark - The mark used in the visualization.
 * @param visTaskMap - The map of visualization tasks.
 */
function computeVisTaskCostMap(
  mark: VegaLiteAnyMark,
  visTaskMap: VisTaskMap,
): VisTaskCostMap {
  return Object.entries(visTaskMap).reduce(
    (costMap, [taskName, { favors, disfavors }]) => {
      // Cost with which the ranking gets better
      const favorsCost =
        favors.find((favor) => favor.mark === mark)?.weight || 0;

      // Cost with which the ranking gets worse
      const disfavorsCost =
        disfavors.find((disfavor) => disfavor.mark === mark)?.weight || 0;

      // Lower cost is better
      const cost = disfavorsCost - favorsCost;
      return { ...costMap, [taskName]: cost };
    },
    {} as VisTaskCostMap,
  );
}

/**
 * Computes the aggregated cost of a visualization by summing the costs
 * for each given task with the data-oriented cost.
 *
 * @param visTaskCosts - Raw task-oriented costs.
 * @param dataOrientedCost - The data-oriented cost.
 */
function computeAggregatedCostMap(
  visTaskCosts: VisTaskCostMap,
  dataOrientedCost: number,
): VisTaskCostMap {
  return Object.entries(visTaskCosts).reduce(
    (costMap, [taskName, cost]) => ({
      ...costMap,
      [taskName]: cost + dataOrientedCost,
    }),
    {} as VisTaskCostMap,
  );
}
