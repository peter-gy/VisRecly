import { ReactNode, createContext, useContext, useReducer } from 'react';

import { RankedVisualizationExplicit } from '@visrecly/ranking';
import { VisTask } from '@visrecly/vis-tasks';

import { initialRecSelectionState } from '@dashboard/modules/rec-selection/beans/beans';
import { RecSelectionState } from '@dashboard/modules/rec-selection/types/types';

/**
 * Possible actions to dispatch to the reducer
 */
type Action =
  | {
      type: 'toggleTask';
      data: VisTask['name'];
    }
  | {
      type: 'setActiveRec';
      data: RankedVisualizationExplicit | undefined;
    };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type RecSelectionContextType = { state: RecSelectionState; dispatch: Dispatch };

const RecSelectionContext = createContext<RecSelectionContextType | undefined>(
  undefined,
);

function recSelectionReducer(
  state: RecSelectionState,
  action: Action,
): RecSelectionState {
  switch (action.type) {
    case 'toggleTask': {
      return {
        ...state,
        activeTasks: state.activeTasks.includes(action.data)
          ? state.activeTasks.filter((task) => task !== action.data)
          : [...state.activeTasks, action.data],
      };
    }
    case 'setActiveRec': {
      return { ...state, activeRec: action.data };
    }
    default:
      return state;
  }
}

type RecSelectionProviderProps = { children: ReactNode };

function RecSelectionProvider({ children }: RecSelectionProviderProps) {
  const [state, dispatch] = useReducer(
    recSelectionReducer,
    initialRecSelectionState,
  );

  return (
    <RecSelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </RecSelectionContext.Provider>
  );
}

function useRecSelection(): RecSelectionContextType {
  const context = useContext(RecSelectionContext);
  if (context === undefined) {
    throw new Error(
      'useRecSelection must be used within a RecSelectionProvider',
    );
  }
  return context;
}

export { RecSelectionProvider, useRecSelection };
