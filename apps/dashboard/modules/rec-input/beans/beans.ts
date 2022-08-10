import { dataSetByName } from '@visrecly/data';

import { RecInputState } from '@dashboard/modules/rec-input/types/types';
import { recInputStateFromDataSet } from '@dashboard/modules/rec-input/utils/utils';

const initialDataSet = dataSetByName('Cars');

/**
 * Initial state of the `RecInputProvider`.
 */
export const initialRecInputState: RecInputState =
  recInputStateFromDataSet(initialDataSet);
