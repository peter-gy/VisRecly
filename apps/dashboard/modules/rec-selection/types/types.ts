import { RankedVisualizationExplicit } from '@visrecly/ranking';
import { VisTask } from '@visrecly/vis-tasks';

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

export type RecSelectionStatus = 'normal' | 'highlighted' | 'faded' | 'ignored';
