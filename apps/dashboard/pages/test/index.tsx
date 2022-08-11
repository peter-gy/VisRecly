import useRankingPipeline from '@dashboard/modules/ranking/hooks/useRankingPipeline';

function TestPage() {
  const { isClingoError, rankingResult, isServerError, isLoading } =
    useRankingPipeline();
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isServerError && <div>Server error</div>}
      {isClingoError && <div>Clingo error</div>}
      {rankingResult && <div>{JSON.stringify(rankingResult, null, 2)}</div>}
    </div>
  );
}

export default TestPage;
