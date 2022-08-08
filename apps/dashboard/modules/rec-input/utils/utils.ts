import { Schema } from '@visrecly/types';

import { DataColumn } from '@dashboard/modules/rec-input/types/types';

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
