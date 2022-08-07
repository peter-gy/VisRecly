import { DataSet } from '@visrecly/data';
import { Draco } from '@visrecly/ranking';

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
};
