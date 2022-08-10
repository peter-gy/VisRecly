/**
 * Represents a raw dataset with metadata.
 */
export type DataSet = {
  name: string;
  description: string;
  source: string;
  data: unknown[];
};

/**
 * Record of `DataSet`s indexed by name.
 */
export type DataSetMap = Record<DataSet['name'], DataSet>;
