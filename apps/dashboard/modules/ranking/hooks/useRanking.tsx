import { useMutation } from '@tanstack/react-query';
import { ClingoError } from 'clingo-wasm';

import {
  RankedVisualizationExplicit,
  RankingFunctionParams,
  RankingFunctionReturn,
  rank,
} from '@visrecly/ranking';

import {
  ApiEndpoint,
  BaseResponse,
} from '@dashboard/modules/api/types/endpoint.type';
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

async function runRanking(
  params: RankingFunctionParams,
): Promise<BaseResponse<ClingoError | RankedVisualizationExplicit[]>> {
  try {
    const result = await rank(...params);
    return { success: true, data: result };
  } catch (err) {
    console.error(err);
    const message = err.message || 'Something went wrong.';
    return { success: false, message };
  }
}

function useRankingNode() {
  const draco = useDraco();
  return useMutation(
    [ApiEndpoint.RunRanking],
    (params: OmitFirst<RankingFunctionParams>) =>
      fetchRanking([draco, ...params]),
    {},
  );
}

function useRankingWeb() {
  const draco = useDraco();
  return useMutation(
    [ApiEndpoint.RunRanking],
    (params: OmitFirst<RankingFunctionParams>) =>
      runRanking([draco, ...params]),
    {},
  );
}

function useRanking(node = false) {
  /* eslint-disable react-hooks/rules-of-hooks */
  return node ? useRankingNode() : useRankingWeb();
}

export default useRanking;
