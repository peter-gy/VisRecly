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
