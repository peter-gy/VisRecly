import { useEffect } from 'react';

import {
  PROJECT_RANGE,
  RELAX_HARD,
} from '@dashboard/modules/ranking/beans/beans';
import useRanking from '@dashboard/modules/ranking/hooks/useRanking';
import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';
import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';

function RankingServiceComponent() {
  const { mutate: runRanking, isLoading, data: baseResponse } = useRanking();
  const {
    state: { selectedDataColumns, numMaxModels },
  } = useRecInput();
  const { dispatch: outputDispatch } = useRecOutput();

  // Sync react-query `isLoading` state with that of `RecOutputContext`
  useEffect(() => {
    outputDispatch({ type: 'setIsLoading', data: isLoading });
  }, [isLoading, outputDispatch]);

  // Actually call the ranking function
  useEffect(() => {
    const selectedColumnNames = selectedDataColumns.map(({ name }) => name);
    runRanking([selectedColumnNames, numMaxModels, RELAX_HARD, PROJECT_RANGE]);
  }, [runRanking, selectedDataColumns, numMaxModels]);

  // Sync react-query `data` state with that of `RecOutputContext`
  useEffect(() => {
    // Process the response as soon as it is available.
    if (baseResponse !== undefined) {
      if (!baseResponse.success) {
        outputDispatch({ type: 'setIsServerError', data: true });
      } else {
        // Handles `isClingoError` internally
        outputDispatch({ type: 'setRankingResult', data: baseResponse.data });
      }
    }
  }, [baseResponse, outputDispatch]);
  return <></>;
}

export default RankingServiceComponent;
