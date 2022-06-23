import tw from 'twin.macro';
import { useState } from 'react';
import Button from '@mui/material/Button';

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-[100vh]`,
    hasBackground && tw`bg-gradient-to-b from-electric to-primary`,
  ],
};

const App = () => {
  const [a, b] = useState(true);
  return (
    <div css={styles.container({ hasBackground: a })}>
      <div tw="flex flex-col justify-center h-full gap-y-5">
        <div className="p-8 bg-primary"></div>
        <Button variant="contained" onClick={() => b(!a)}>
          Switch
        </Button>
      </div>
    </div>
  );
};

export default App;
