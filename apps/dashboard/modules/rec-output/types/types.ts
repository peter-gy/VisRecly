import { ClingoError } from 'clingo-wasm';

import { RankedVisualization } from '@visrecly/ranking';

export type RecOutputState = {
  /**
   * Result of the ranking.
   *
   * Undefined if no ranking has been performed.
   */
  rankingResult?: ClingoError | RankedVisualization[];

  /**
   * Indicates whether the ranking is in progress.
   */
  isLoading: boolean;

  /**
   * Indicates whether `rankingResult` is of type `ClingoError`.
   *
   * Utility state fragment to avoid checking for `'Error' in rankingResult`.
   */
  isClingoError: boolean;

  /**
   * Indicates that some non-clingo-related, server-side error has occurred.
   */
  isServerError: boolean;
};
