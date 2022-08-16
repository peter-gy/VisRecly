import { BARLEY } from './barley';
import { CARS } from './cars';
import { MONARCHS } from './monarchs';
import { MOVIES } from './movies';
import { DataSet, DataSetMap } from './types';
import { WHEAT } from './wheat';

export const DATA_SETS: DataSet[] = [BARLEY, CARS, MONARCHS, MOVIES, WHEAT];

/**
 * A collection of all declared `DataSet` instances,
 * indexed by name.
 */
export const DATA_SET_MAP: DataSetMap = DATA_SETS.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
);

/**
 * Helper function to access a `DataSet` instance by name.
 *
 * Returns the value from the default `DATA_SET_MAP`.
 *
 * @param name - the name of the data set to retrieve
 */
export function dataSetByName(name: DataSet['name']): DataSet {
  if (!DATA_SET_MAP[name]) {
    throw new Error(`No data set with name "${name}"`);
  }
  return DATA_SET_MAP[name];
}
