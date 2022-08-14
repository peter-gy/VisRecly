import { ReactNode, useRef } from 'react';
import tw from 'twin.macro';

import { RankedVisualization } from '@visrecly/ranking';

import { IconButton, List, ListItem } from '@mui/material';

import AlertMessage from '@dashboard/modules/components/alert-message/views/AlertMessage';
import {
  ArrowDown,
  ArrowUp,
} from '@dashboard/modules/components/icons/views/Arrow';
import InfoDialogButton from '@dashboard/modules/components/info-dialog-button/views/InfoDialogButton';
import LoadingIndicator from '@dashboard/modules/components/loading-indicator/views/LoadingIndicator';
import useRecListDimensions from '@dashboard/modules/rec-list/hooks/useRecListDimensions';
import RecListItem from '@dashboard/modules/rec-list/views/RecListItem';
import { useRecOutput } from '@dashboard/modules/rec-output/provider/RecOutputContext';
import { useRecSelection } from '@dashboard/modules/rec-selection/provider/RecSelectionContext';
import { determineSelectionStatus } from '@dashboard/modules/rec-selection/utils/utils';
import { RankedVisualizationExplicit } from '@dashboard/modules/utils/types/types';

const styles = {
  listViewContainer: ({
    isLoading,
    isError,
  }: {
    isLoading: boolean;
    isError: boolean;
  }) => [
    tw`bg-primary-400 h-[100%] w-full flex flex-col justify-center items-center rounded-md drop-shadow-xl`,
    isLoading && tw`bg-primary-300`,
    isError && tw`px-4`,
  ],
};

function RecList() {
  const {
    state: { activeRec },
    dispatch: recSelectionDispatch,
  } = useRecSelection();
  const handleItemMouseEnter = (vis: RankedVisualizationExplicit) => {
    recSelectionDispatch({ type: 'setActiveRec', data: vis });
  };
  const handleItemMouseLeave = (_: RankedVisualizationExplicit) => {
    recSelectionDispatch({ type: 'setActiveRec', data: undefined });
  };

  let component: ReactNode;
  const { recListItemWidth, recListItemHeight } = useRecListDimensions();
  const {
    state: { isLoading, isServerError, isClingoError, rankingResult },
  } = useRecOutput();
  let isUnsatisfiable = false;
  if (isLoading || rankingResult === undefined) {
    component = <LoadingIndicator />;
  } else if (isServerError) {
    component = (
      <AlertMessage
        message="General Server Error - Please refresh the page"
        severity="error"
      />
    );
  } else if (isClingoError) {
    component = (
      <AlertMessage
        message="ASP Server Error - Please use a different data set"
        severity="error"
      />
    );
  } else {
    const visArray = rankingResult as RankedVisualization[];
    const items = visArray.map((e, idx) => (
      <RecListItem
        key={`rec-list-item-${idx}`}
        rank={idx + 1}
        rankedVisualization={e}
        width={recListItemWidth}
        height={recListItemHeight}
        onMouseEnter={() => handleItemMouseEnter({ ...e, rank: idx })}
        onMouseLeave={() => handleItemMouseLeave({ ...e, rank: idx })}
        selectionStatus={determineSelectionStatus(activeRec, {
          ...e,
          rank: idx,
        })}
      />
    ));
    if (items.length === 0) {
      isUnsatisfiable = true;
      component = (
        <AlertMessage
          message="No results found for these data column preferences. Please select new variables."
          severity="warning"
        />
      );
    } else {
      component = <RecListView items={items} />;
    }
  }
  return (
    <>
      <RecListHeader />
      <div className="bg-primary-200 px-4 py-6 w-full h-[calc(100%-4.5rem)] flex justify-center items-center">
        <div
          css={styles.listViewContainer({
            isLoading,
            isError: isClingoError || isServerError || isUnsatisfiable,
          })}
        >
          {component}
        </div>
      </div>
    </>
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
