import { DATA_SETS, dataSetByName } from '@visrecly/data';
import { Draco } from '@visrecly/ranking';

import { RecInputState } from '@dashboard/modules/rec-input/types/types';
import { defaultSelectedDataColumns } from '@dashboard/modules/rec-input/utils/utils';

const initialDataSet = dataSetByName('Cars');
const draco = Draco.fromData(initialDataSet.data, initialDataSet.source);
const initialDataColumns = defaultSelectedDataColumns(draco.schema);

/**
 * Initial state of the `RecInputProvider`.
 */
export const initialRecInputState: RecInputState = {
  draco,
  availableDatasets: DATA_SETS,
  selectedDataset: initialDataSet,
  selectedDataColumns: initialDataColumns,
};
