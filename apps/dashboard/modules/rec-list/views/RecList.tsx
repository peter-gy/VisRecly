import { ReactNode, useRef } from 'react';

import { RankedVisualization } from '@visrecly/ranking';

import { IconButton, List, ListItem } from '@mui/material';

import {
  ArrowDown,
  ArrowUp,
} from '@dashboard/modules/components/icons/views/Arrow';
import InfoDialogButton from '@dashboard/modules/components/info-dialog-button/views/InfoDialogButton';
import RecListItem from '@dashboard/modules/rec-list/views/RecListItem';
import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';

function RecList() {
  let component: ReactNode;
  const {
    state: { isLoading, isServerError, isClingoError, rankingResult },
  } = useRecOutput();
  if (isLoading || rankingResult === undefined) {
    component = <div>Loading...</div>;
  } else if (isServerError) {
    component = <div>Server error</div>;
  } else if (isClingoError) {
    component = <div>Clingo error</div>;
  } else {
    const visArray = rankingResult as RankedVisualization[];
    const items = visArray.map((e, idx) => (
      <RecListItem
        key={`rec-list-item-${idx}`}
        rank={idx + 1}
        rankedVisualization={e}
      />
    ));
    component = <RecListView items={items} />;
  }
  return (
    <div className="w-[22.5vw] flex flex-col justify-between items-center border-r-2 border-primary-600">
      <RecListHeader />
      <div className="bg-primary-200 px-4 py-6 w-full h-[calc(100%-4.5rem)] flex justify-center items-center">
        <div className="bg-primary-400 max-h-[100%] w-full flex flex-col justify-center items-center rounded-md drop-shadow-xl">
          {component}
        </div>
      </div>
    </div>
  );
}

function RecListHeader() {
  return (
    <div className="p-4 w-full bg-primary-600 flex justify-center items-center space-x-2 text-white font-bold">
      <div>Overall Rankings</div>
      <InfoDialogButton
        tooltip="How to interpret this?"
        title="Overall Rankings"
        description={`
        Each recommendation is displayed in this column.
        The higher a given visualization appears in the list, the more relevant it is overall.
        `}
      />
    </div>
  );
}

type RecListViewProps = {
  items: ReactNode[];
};

function RecListView({ items }: RecListViewProps) {
  const listRef = useRef<HTMLUListElement>(undefined);

  const handleScrollUpClick = () => {
    if (listRef.current) {
      listRef.current.scroll({ behavior: 'smooth', top: 0 });
    }
  };
  const handleScrollDownClick = () => {
    if (listRef.current) {
      listRef.current.scroll({
        behavior: 'smooth',
        top: listRef.current.scrollHeight,
      });
    }
  };
  return (
    <>
      <IconButton size="large" onClick={handleScrollUpClick}>
        <ArrowUp className="text-white" fontSize="large" />
      </IconButton>
      <List ref={listRef} style={{ maxHeight: '100%', overflow: 'scroll' }}>
        {items.map((item, index) => (
          <ListItem key={`rec-list-item-${index}`}>{item}</ListItem>
        ))}
      </List>
      <IconButton size="large" onClick={handleScrollDownClick}>
        <ArrowDown className="text-white" fontSize="large" />
      </IconButton>
    </>
  );
}

export default RecList;
