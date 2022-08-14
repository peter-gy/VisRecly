import { TASK_MAP } from '@visrecly/vis-tasks';

import { RecSelectionState } from '@dashboard/modules/rec-selection/types/types';

export const initialRecSelectionState: RecSelectionState = {
  activeTasks: Object.keys(TASK_MAP),
  activeRec: undefined,
};
