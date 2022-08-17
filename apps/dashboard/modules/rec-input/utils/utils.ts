import { DATA_SETS, DataSet } from '@visrecly/data';
import { Schema } from '@visrecly/draco-core';
import { Draco } from '@visrecly/draco-web';

import {
  DataColumn,
  RecInputState,
} from '@dashboard/modules/rec-input/types/types';

/**
 * Extracts all the `DataColumn`s which can be found in the specified `schema`.
 * @param schema
 */
export function extractAllDataColumns(schema: Schema): DataColumn[] {
  return Object.keys(schema.stats).map((dataColumnName) =>
    extractDataColum(dataColumnName, schema),
  );
}

/**
 * Extracts a `DataColumn` instance for the column
 * with the supplied `dataColumnName` from the pre-generated `schema`.
 *
 * @param dataColumnName - The name of the column to extract. Must appear in the `schema`.
 * @param schema - The pre-generated data `Schema`.
 */
export function extractDataColum(
  dataColumnName: string,
  schema: Schema,
): DataColumn {
  const dataType = schema.stats[dataColumnName].type;
  return { name: dataColumnName, type: dataType };
}

/**
 * Extracts a list of `DataColumn` instances from
 * the schema to be used as initial selection.
 *
 * The current implementation takes the first two columns of the schema.
 *
 * @param schema - The pre-generated data `Schema`.
 */
export function defaultSelectedDataColumns(schema: Schema) {
  const dataColumnNames = Object.keys(schema.stats).splice(0, 2);
  return dataColumnNames.map((dataColumnName) =>
    extractDataColum(dataColumnName, schema),
  );
}

/**
 * Utility method to scaffold a `RecInputState` from the supplied `dataSet`.
 *
 * Constructs a new `Draco` instance internally and extracts data schema data from the `dataSet`.
 *
 * @param dataSet - The data set to be used for VisRec
 */
export function recInputStateFromDataSet(dataSet: DataSet): RecInputState {
  const draco = Draco.fromData(dataSet.data, dataSet.source);
  const initialDataColumns = defaultSelectedDataColumns(draco.schema);
  const allDataColumns = extractAllDataColumns(draco.schema);
  return {
    draco,
    availableDatasets: DATA_SETS,
    selectedDataset: dataSet,
    availableDataColumns: allDataColumns,
    selectedDataColumns: initialDataColumns,
    numMaxModels: 15,
  };
}
