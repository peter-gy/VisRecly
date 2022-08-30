import { NextApiRequest, NextApiResponse } from 'next';

import {
  Draco,
  RankingFunctionParams,
  RankingFunctionReturn,
  rank,
} from '@visrecly/ranking';

import { BaseResponse } from '@dashboard/modules/api/types/endpoint.type';

/**
 * Dedicated API endpoint to run the ranking in order to
 * let `clingo-wasm` be compiled and executed on the server side.
 *
 * @param req - the incoming Next API request
 * @param res - the returned Next API response
 * @see https://github.com/domoritz/clingo-wasm/issues/185#issuecomment-1206916557
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponse<Awaited<RankingFunctionReturn>>>,
) {
  const [dracoJson, ...rest] = req.body;
  const payload = [Draco.fromJson(dracoJson), ...rest] as RankingFunctionParams;
  try {
    const result = await rank(...payload);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    const message = err.message || 'Something went wrong.';
    res.status(500).json({ success: false, message });
  }
}

// Do not export the API route for now, as in-browser ranking is implemented
// export default handler;
export default () => <></>;
