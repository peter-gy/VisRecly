import { Schema } from '@visrecly/types';

import { DataColumn } from '@dashboard/modules/rec-input/types/types';

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
