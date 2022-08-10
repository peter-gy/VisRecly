// React Context best-practices as defined by Kent C. Dodds: https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { ReactNode, createContext, useContext, useReducer } from 'react';

import { DataSet } from '@visrecly/data';

import { initialRecInputState } from '@dashboard/modules/rec-input/beans/beans';
import { RecInputState } from '@dashboard/modules/rec-input/types/types';
import {
  extractDataColum,
  recInputStateFromDataSet,
} from '@dashboard/modules/rec-input/utils/utils';

/**
 * Possible actions to dispatch to the reducer
 */
type Action =
  | { type: 'setSelectedDataset'; data: DataSet }
  | { type: 'setSelectedDataColumns'; data: string[] };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type RecInputContextType = { state: RecInputState; dispatch: Dispatch };

const RecInputContext = createContext<RecInputContextType | undefined>(
  undefined,
);

function recInputReducer(state: RecInputState, action: Action): RecInputState {
  switch (action.type) {
    case 'setSelectedDataset': {
      return setSelectedDataset(state, action.data);
    }
    case 'setSelectedDataColumns': {
      return setSelectedDataColumns(state, action.data);
    }
    default:
      return state;
  }
}

function setSelectedDataset(
  oldState: RecInputState,
  dataset: DataSet,
): RecInputState {
  return {
    ...oldState,
    ...recInputStateFromDataSet(dataset),
  };
}

function setSelectedDataColumns(
  oldState: RecInputState,
  dataColumnNames: string[],
): RecInputState {
  const schema = oldState.draco.schema;
  const selectedDataColumns = dataColumnNames.map((pref) =>
    extractDataColum(pref, schema),
  );
  return { ...oldState, selectedDataColumns };
}

type RecInputProviderProps = { children: ReactNode };

function RecInputProvider({ children }: RecInputProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(recInputReducer, initialRecInputState);

  return (
    <RecInputContext.Provider value={{ state, dispatch }}>
      {children}
    </RecInputContext.Provider>
  );
}

function useRecInput(): RecInputContextType {
  const context = useContext(RecInputContext);

  if (context === undefined) {
    throw new Error('useRecInput must be used within a RecInputProvider');
  }

  return context;
}

export { RecInputProvider, useRecInput };
