import { useEffect } from 'react';

import { CARS } from '@visrecly/data';

import useRanking from '@dashboard/modules/ranking/hooks/useRanking';

function TestPage() {
  const { mutate: runRanking, isLoading, data } = useRanking();
  useEffect(() => {
    runRanking([CARS, ['Acceleration', 'Year', 'Origin']]);
  }, []);
  return (
    <div>
      <h1>Test Page</h1>
      {isLoading && <p>Loading...</p>}
      {data?.data && JSON.stringify(data, null, 2)}
    </div>
  );
}

export default TestPage;
