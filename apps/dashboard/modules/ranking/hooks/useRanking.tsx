import { useMutation } from '@tanstack/react-query';

import {
  RankingFunctionParams,
  RankingFunctionReturn,
} from '@visrecly/ranking';

import { ApiEndpoint } from '@dashboard/modules/api/types/endpoint.type';
import { baseFetch } from '@dashboard/modules/api/utils/api.utils';
import useDraco from '@dashboard/modules/rec-input/hooks/useDraco';
import { OmitFirst } from '@dashboard/modules/utils/types/types';

function fetchRanking(params: RankingFunctionParams) {
  return baseFetch<Awaited<RankingFunctionReturn>>(ApiEndpoint.RunRanking, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function useRanking() {
  const draco = useDraco();
  return useMutation(
    [ApiEndpoint.RunRanking],
    (params: OmitFirst<RankingFunctionParams>) =>
      fetchRanking([draco, ...params]),
    {},
  );
}

export default useRanking;
