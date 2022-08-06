import { ClingoError } from 'clingo-wasm';

import { DataSet } from '@visrecly/data';
import { Draco, SolutionSet, solutionSetToZippedElements } from "@visrecly/draco-web";

import { encodingPrefsToAsp } from './encodingPreferences';

export async function rank(
  dataSet: DataSet,
  encodingPrefs: string[],
  numMaxModels: number = 10,
) {
  const draco = new Draco(dataSet.data, dataSet.source);
  // Extend the core ASP of Draco by encoding declarations
  const program = encodingPrefsToAsp(encodingPrefs);
  const solutionOrError = await draco.solve(program, {
    models: numMaxModels,
  });
  const isError = 'Error' in solutionOrError;
  if (isError) {
    return solutionOrError as ClingoError;
  }
  const solution = solutionOrError as SolutionSet;
  const elements = solutionSetToZippedElements(solution);
  return elements;
}
