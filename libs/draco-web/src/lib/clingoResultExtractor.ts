import { ClingoResult } from 'clingo-wasm';

import { Constraint, VegaLiteSpec, asp2vl } from '@visrecly/draco-core';

import { Model } from './types';

const SOFT_REGEX = /(soft\(\w+).*?\)/;

/**
 * Extracts models from the result of a Clingo run.
 * Returns an empty array if there are no witnesses in `result`.
 *
 * Adapted from [draco-vis](https://github.com/uwdata/draco-vis/blob/master/src/spec.ts).
 *
 * @param result - Clingo result object.
 * @param constraints - Constraints used by the solver.
 */
export function extractModels(
  result: ClingoResult,
  constraints: Constraint[],
): Model[] {
  if (result.Result === 'UNSATISFIABLE') return [];
  return (result.Call || []).reduce((arr: any[], el: any) => {
    el.Witnesses.forEach((d: any) => {
      const facts = d.Value;
      const costs = d.Costs;

      const violationAsps = facts.filter((fact: string) => {
        return fact.startsWith('soft(');
      });

      const violations = violationAsps.map((asp: string) => {
        const matcher = SOFT_REGEX.exec(asp);

        if (!matcher) {
          throw Error(`invalid violation: ${asp}`);
        }
        const toMatch = matcher[1];

        const constraint = constraints.find((curr: Constraint) => {
          return curr.asp.startsWith(toMatch);
        });

        if (!constraint) {
          throw Error(`${toMatch} not found!`);
        }

        return {
          ...constraint,
          witness: asp,
        };
      });

      arr.push({
        costs,
        facts,
        violations,
      });
    });
    return arr;
  }, []);
}

/**
 * Converts `Model`s to vega-lite specifications.
 * @param models - Models to convert.
 * @param url - optional URL of the data source.
 */
export function models2vl(models: Model[], url?: string): VegaLiteSpec[] {
  return models.map((model) => asp2vl(model.facts, url));
}
