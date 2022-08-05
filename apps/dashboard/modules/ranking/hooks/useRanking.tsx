import { useMutation } from '@tanstack/react-query';

import { RankingFunctionParams } from '@visrecly/ranking';

import { ApiEndpoint } from '@dashboard/modules/api/types/endpoint.type';
import { baseFetch } from '@dashboard/modules/api/utils/api.utils';

function fetchRanking(params: RankingFunctionParams) {
  return baseFetch<any>(ApiEndpoint.RunRanking, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function useRanking() {
  return useMutation(
    [ApiEndpoint.RunRanking],
    (...params: RankingFunctionParams) => fetchRanking(params),
    {},
  );
}

export default useRanking;
