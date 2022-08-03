import { ReactNode, useRef } from 'react';

import { IconButton, List, ListItem } from '@mui/material';

import { ArrowDown, ArrowUp } from '../../components/icons/views/Arrow';
import InfoDialogButton from '../../components/info-dialog-button/views/InfoDialogButton';

type RecListProps = RecListViewProps & {};

function RecList({ items }: RecListProps) {
  return (
    <div className="bg-[blue] w-[22.5vw] flex flex-col justify-between items-center">
      <RecListHeader />
      <div className="bg-[yellow] px-4 py-6 w-full max-h-[calc(100%-4.5rem)] flex justify-center items-center">
        <RecListView items={items} />
      </div>
    </div>
  );
}

function RecListHeader() {
  return (
    <div className="p-4 w-full bg-[orange] flex justify-center items-center space-x-2">
      <div>Header</div>
      <InfoDialogButton tooltip="Info" title="Title" description="Desc" />
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
    <div className="bg-[green] max-h-[100%] w-full flex flex-col justify-center items-center">
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
    </div>
  );
}

export default RecList;
