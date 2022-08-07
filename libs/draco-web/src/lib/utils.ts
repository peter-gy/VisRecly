import { SolutionSet, ZippedSolutionSetElement } from './types';

/**
 * Transforms a `SolutionSet` into a `ZippedSolutionSetElement[]`.
 * @param solutionSet - the `SolutionSet` to transform
 */
export function solutionSetToZippedElements(
  solutionSet: SolutionSet,
): ZippedSolutionSetElement[] {
  return solutionSet.models.map((model, idx) => ({
    model,
    vegaLiteSpec: solutionSet.vegaLiteSpecs[idx],
  }));
}
