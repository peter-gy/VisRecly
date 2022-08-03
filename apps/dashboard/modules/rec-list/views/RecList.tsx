import { ReactNode } from 'react';

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
  return (
    <div className="bg-[green] max-h-[100%] w-full flex flex-col justify-center items-center">
      <IconButton size="large">
        <ArrowUp className="text-white" fontSize="large" />
      </IconButton>
      <List style={{ maxHeight: '100%', overflow: 'scroll' }}>
        {items.map((item, index) => (
          <ListItem key={`rec-list-item-${index}`}>{item}</ListItem>
        ))}
      </List>
      <IconButton size="large">
        <ArrowDown className="text-white" fontSize="large" />
      </IconButton>
    </div>
  );
}

export default RecList;
