import { useEffect } from 'react';

import { CARS } from '@visrecly/data';
import { SolutionSet } from '@visrecly/ranking';

import useRanking from '@dashboard/modules/ranking/hooks/useRanking';

function TestPage() {
  const { mutate: runRanking, isLoading, data } = useRanking();
  useEffect(() => {
    runRanking([CARS, {x: 'Year', y: 'Miles_per_Gallon'}]);
  }, []);
  return (
    <div>
      <h1>Test Page</h1>
      {isLoading && <p>Loading...</p>}
      {data?.data &&
        JSON.stringify((data.data as SolutionSet).vegaLiteSpecs, null, 2)}
    </div>
  );
}

export default TestPage;
