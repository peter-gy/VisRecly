import { VegaLiteSpec } from '@visrecly/draco-core';
import { RankedVisualization } from '@visrecly/ranking';

import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';

/**
 * Quick access to the vega-lite specs of the ranking result.
 *
 * Returns `undefined` if no ranking took place or if there was an error.
 */
function useVegaLiteSpecs(): VegaLiteSpec[] | undefined {
  const {
    state: { rankingResult, isClingoError },
  } = useRecOutput();
  if (rankingResult === undefined || isClingoError) {
    return undefined;
  }
  const visArray = rankingResult as RankedVisualization[];
  return visArray.map(({ vegaLiteSpec }) => vegaLiteSpec);
}

export default useVegaLiteSpecs;
