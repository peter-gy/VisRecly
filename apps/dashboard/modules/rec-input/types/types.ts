import { DataSet } from '@visrecly/data';
import { Draco } from '@visrecly/ranking';

export type DataColumn = {
  /**
   * Name of the data column, as appears as a JSON property key.
   */
  name: string;

  /**
   * Data type of the data column.
   */
  type: string;
};

export type RecInputState = {
  /**
   * The Draco instance used to process input.
   */
  draco: Draco;

  /**
   * Pre-defined data sets to choose from.
   */
  availableDatasets: DataSet[];

  /**
   * Currently selected data set.
   */
  selectedDataset: DataSet;

  /**
   * Data columns available in the currently selected data set.
   */
  availableDataColumns: DataColumn[];

  /**
   * Currently selected data columns.
   */
  selectedDataColumns: DataColumn[];

  /**
   * Number of models to generate.
   */
  numMaxModels: number;
};
