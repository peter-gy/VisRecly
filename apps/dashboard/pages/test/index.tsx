import { useEffect } from 'react';

import { CARS } from '@visrecly/data';

import useRanking from '@dashboard/modules/ranking/hooks/useRanking';

function TestPage() {
  const { mutate, isLoading, data } = useRanking();
  useEffect(() => {
    mutate(CARS.data);
  }, []);
  return (
    <div>
      <h1>Test Page</h1>
      {isLoading && <p>Loading...</p>}
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default TestPage;
