import { Constraint } from '@visrecly/draco-core';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { Field } from 'vega-lite/build/src/channeldef';
import { ClingoResult } from 'clingo-wasm';

/**
 * Represents a weight for a given soft constraint, identified by `name`.
 */
export type Weight = {
  name: string;
  value: number;
};

/**
 * Options for Draco.
 */
export type DracoOptions = {
  /**
   * If true, hard constraints will not be strictly enforced, instead
   * incurring an infinite cost.
   */
  relaxHard?: boolean;

  /**
   * Weight for the soft constraints.
   */
  weights?: Weight[];

  /**
   * Number of models.
   */
  models?: number;

  /**
   * Options to be passed to Clingo directly.
   */
  clingoOptions?: string[];
};

/**
 * Represents a constraint violation.
 */
export type Violation = {
  witness: string;
  constraint: Constraint;
};

/**
 * Represents a single solution of an ASP program.
 */
export type Model = {
  costs: number[];
  facts: string[];
  violations: Violation[];
};

/**
 * Represents a collection of solutions, wrapped with the corresponding
 * ASP programs, vega-lite specifications and result object from the solver.
 */
export type SolutionSet = {
  models: Model[]; // ASP models
  vegaLiteSpecs: TopLevelUnitSpec<Field>[]; // vega-lite specs
  result: ClingoResult; // result object from Clingo (for misc. use).
};
