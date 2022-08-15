import { VegaLiteSpec } from '@visrecly/draco-core';
import { VisTask, VisTaskCostMap } from '@visrecly/vis-tasks';

import { rank } from './ranking';

type RankingFunction = typeof rank;

/**
 * Type alias for the parameters accepted by the ranking function.
 */
export type RankingFunctionParams = Parameters<RankingFunction>;

/**
 * Type alias for the raw return value of the ranking function.
 */
export type RankingFunctionReturn = ReturnType<RankingFunction>;

/**
 * Type alias to map a rank to a given vis task
 */
export type VisTaskRankMap = Record<VisTask['name'], number>;

/**
 * Associates ranking costs with a visualization recommendation.
 */
export type RankedVisualization = {
  /**
   * The vega-lite spec of the visualization.
   */
  vegaLiteSpec: VegaLiteSpec;

  /**
   * The data-oriented cost of this visualization, obtained
   * by the cost of the ASP solution retrieved by `draco`.
   */
  dataOrientedCost: number;

  /**
   * The task-oriented cost of this visualization, obtained
   * by comparing the generated vega-lite spec with the preferences
   * defined for visualization tasks.
   */
  visTaskCosts: VisTaskCostMap;

  /**
   * Overall cost, computed as a function of `dataOrientedCost` and `visTaskCosts`.
   */
  overallCost: number;

  /**
   * The total cost per vis task, equals the sum of the data-oriented
   * and task-oriented costs.
   */
  aggregatedCosts: VisTaskCostMap;
};

/**
 * Represents a `RankedVisualization` with the additional property `rank`
 * being explicitly attached to it.
 */
export type RankedVisualizationExplicit = RankedVisualization & {
  overallRank: number;
  visTaskRankMap: VisTaskRankMap;
};

export type CostRange = {
  min: number;
  max: number;
};
