import { DATA_SETS } from '@visrecly/data';
import { Draco } from '@visrecly/ranking';

import { RecInputState } from '@dashboard/modules/rec-input/types/types';

const initialDataSet = DATA_SETS[0];
const draco = Draco.fromData(initialDataSet.data, initialDataSet.source);

/**
 * Initial state of the `RecInputProvider`.
 */
export const initialRecInputState: RecInputState = {
  draco,
  availableDatasets: DATA_SETS,
  selectedDataset: initialDataSet,
  encodingPrefs: [],
};
