import { ClingoError } from 'clingo-wasm';
import { ReactNode, createContext, useContext, useReducer } from 'react';

import { RankedVisualization } from '@visrecly/ranking';

import { initialRecOutputState } from '@dashboard/modules/rec-output/beans/beans';
import { RecOutputState } from '@dashboard/modules/rec-output/types/types';

/**
 * Possible actions to dispatch to the reducer
 */
type Action =
  | {
      type: 'setRankingResult';
      data: ClingoError | RankedVisualization[];
    }
  | {
      type: 'setIsLoading';
      data: boolean;
    }
  | {
      type: 'setIsServerError';
      data: boolean;
    };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type RecOutputContextType = { state: RecOutputState; dispatch: Dispatch };

const RecOutputContext = createContext<RecOutputContextType | undefined>(
  undefined,
);

function recOutputReducer(
  state: RecOutputState,
  action: Action,
): RecOutputState {
  switch (action.type) {
    case 'setRankingResult': {
      return {
        ...state,
        rankingResult: action.data,
        isClingoError: 'Error' in action.data,
      };
    }
    case 'setIsLoading': {
      return { ...state, isLoading: action.data };
    }
    case 'setIsServerError': {
      return { ...state, isServerError: action.data, rankingResult: undefined };
    }
    default:
      return state;
  }
}

type RecOutputProviderProps = { children: ReactNode };

function RecOutputProvider({ children }: RecOutputProviderProps) {
  const [state, dispatch] = useReducer(recOutputReducer, initialRecOutputState);
  return (
    <RecOutputContext.Provider value={{ state, dispatch }}>
      {children}
    </RecOutputContext.Provider>
  );
}

function useRecOutput() {
  const context = useContext(RecOutputContext);
  if (context === undefined) {
    throw new Error('useRecOutput must be used within a RecOutputProvider');
  }
  return context;
}

export { RecOutputProvider, useRecOutput };
