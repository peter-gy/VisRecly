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
  VisTaskCostMap,
  VisTaskMap,
} from '@visrecly/vis-tasks';

import { encodingPrefsToAsp } from './encodingPreferences';
import { RankedVisualization } from './types';

/**
 * Top-level function to generate and rank visualizations
 * from the supplied `dataSet` under the consideration of encoding preferences,
 * that is, which columns of `dataSet` should be encoded during the VisRec.
 *
 * @param draco - The `Draco` instance to handle VisRec.
 * @param encodingPrefs - A list of the column names of the data set that should be visualized.
 * @param numMaxModels - The maximum number of models to return. Gets passed to Clingo under the hood.
 * @param visTaskMap - The map of visualization tasks to consider when ranking.
 */
export async function rank(
  draco: Draco,
  encodingPrefs: string[],
  numMaxModels = 10,
  visTaskMap: VisTaskMap = TASK_MAP,
) {
  // Extend the core ASP of Draco by encoding declarations
  const program = encodingPrefsToAsp(encodingPrefs);
  const solutionOrError = await draco.solve(program, {
    models: numMaxModels,
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
  elementsWithCosts.sort(compareVisualizations);
  return elementsWithCosts;
}

/**
 * Compares two ranked visualizations based on their cost.
 * Used to custom sort elements to create a ranking.
 *
 * @param a - The first ranked visualization.
 * @param b  - The second ranked visualization.
 */
function compareVisualizations(a: RankedVisualization, b: RankedVisualization) {
  return b.dataOrientedCost - a.dataOrientedCost;
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
  return { vegaLiteSpec, dataOrientedCost, visTaskCosts };
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
