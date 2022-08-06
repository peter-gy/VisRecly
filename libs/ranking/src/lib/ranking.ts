import { ClingoError } from 'clingo-wasm';

import { DataSet } from '@visrecly/data';
import { Draco, SolutionSet } from '@visrecly/draco-web';

export async function rank(dataSet: DataSet, numMaxModels: number = 10) {
  const draco = new Draco(dataSet.data, dataSet.source);
  const solutionOrError = await draco.solve('', { models: numMaxModels });
  const isError = 'Error' in solutionOrError;
  if (isError) {
    return solutionOrError as ClingoError;
  }
  const solution = solutionOrError as SolutionSet;
  return solution;
}
