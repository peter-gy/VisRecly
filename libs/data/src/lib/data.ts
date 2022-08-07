import { CARS } from './cars';
import { DataSet, DataSetMap } from './types';

export const DATA_SETS: DataSet[] = [CARS];

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
  return DATA_SET_MAP[name];
}
