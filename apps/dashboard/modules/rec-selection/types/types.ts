import { VisTask } from '@visrecly/vis-tasks';

import { RankedVisualizationExplicit } from '@dashboard/modules/utils/types/types';

export type RecSelectionState = {
  /**
   * List of the vis-tasks that are currently not faded out.
   */
  activeTasks: VisTask['name'][];

  /**
   * The currently active (hovered) recommendation.
   */
  activeRec?: RankedVisualizationExplicit;
};
