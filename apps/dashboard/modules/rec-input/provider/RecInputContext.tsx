// React Context best-practices as defined by Kent C. Dodds: https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { ReactNode, createContext, useContext, useReducer } from 'react';

import { DataSet } from '@visrecly/data';
import { Draco } from '@visrecly/ranking';

import { initialRecInputState } from '@dashboard/modules/rec-input/beans/beans';
import { RecInputState } from '@dashboard/modules/rec-input/types/types';

/**
 * Possible actions to dispatch to the reducer
 */
type Action =
  | { type: 'setSelectedDataset'; data: DataSet }
  | { type: 'setEncodingPrefs'; data: string[] };

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
    case 'setEncodingPrefs': {
      return {
        ...state,
      };
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
    selectedDataset: dataset,
    // Updating the used Draco instance too
    draco: new Draco(dataset.data, dataset.source),
  };
}

function setEncodingPrefs(
  oldState: RecInputState,
  encodingPrefs: string[],
): RecInputState {
  const schemaStats = oldState.draco.schema.stats;
  return { ...oldState };
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
