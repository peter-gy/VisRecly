import { RecOutputState } from '@dashboard/modules/rec-output/types/types';

export const initialRecOutputState: RecOutputState = {
  rankingResult: undefined,
  isLoading: false,
  isClingoError: false,
  isServerError: false,
};
