import { asp2vl, Constraint } from '@visrecly/draco-core';
import { Model } from '@visrecly/draco-web';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { Field } from 'vega-lite/build/src/channeldef';
import { ClingoResult } from 'clingo-wasm';

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
  constraints: Constraint[]
): Model[] {
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
 */
export function models2vl(models: Model[]): TopLevelUnitSpec<Field>[] {
  return models.map((model) => asp2vl(model.facts));
}
