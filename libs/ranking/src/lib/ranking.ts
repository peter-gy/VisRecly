import { ClingoError } from 'clingo-wasm';

import { DataSet } from '@visrecly/data';
import { Draco, SolutionSet } from '@visrecly/draco-web';
import { EncodingPreference, encodingPrefsToAsp } from "./encodingPreferences";

export async function rank(dataSet: DataSet, encodingPrefs: EncodingPreference, numMaxModels: number = 10) {
  const draco = new Draco(dataSet.data, dataSet.source);
  // Extend the core ASP of Draco by encoding declarations
  const program = encodingPrefsToAsp(encodingPrefs);
  const solutionOrError = await draco.solve(program, { models: numMaxModels, relaxHard: false });
  const isError = 'Error' in solutionOrError;
  if (isError) {
    return solutionOrError as ClingoError;
  }
  const solution = solutionOrError as SolutionSet;
  return solution;
}
