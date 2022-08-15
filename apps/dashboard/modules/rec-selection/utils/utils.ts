import { RankedVisualizationExplicit } from '@visrecly/ranking';

import { RecSelectionStatus } from '@dashboard/modules/rec-selection/types/types';

export function determineSelectionStatus(
  activeRec: RankedVisualizationExplicit | undefined,
  rec: RankedVisualizationExplicit,
): RecSelectionStatus {
  if (activeRec === undefined) {
    return 'normal';
  }
  return activeRec.overallRank === rec.overallRank ? 'highlighted' : 'faded';
}
