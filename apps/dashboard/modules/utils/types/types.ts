import { RankedVisualization } from '@visrecly/ranking';

/**
 * Omits the first element's type of the passed array.
 */
export type OmitFirst<T extends unknown[]> = T extends [unknown, ...infer R]
  ? R
  : never;

/**
 * Represents a `RankedVisualization` with the additional property `rank`
 * being explicitly attached to it.
 */
export type RankedVisualizationExplicit = RankedVisualization & {
  rank: number;
};
