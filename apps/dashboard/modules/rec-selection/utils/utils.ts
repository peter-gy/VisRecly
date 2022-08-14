import { RecSelectionStatus } from '@dashboard/modules/rec-selection/types/types';
import { RankedVisualizationExplicit } from '@dashboard/modules/utils/types/types';

export function determineSelectionStatus(
  activeRec: RankedVisualizationExplicit | undefined,
  rec: RankedVisualizationExplicit,
): RecSelectionStatus {
  if (activeRec === undefined) {
    return 'normal';
  }
  return activeRec.rank === rec.rank ? 'highlighted' : 'faded';
}
