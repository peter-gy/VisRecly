/**
 * Possible actions to dispatch to the reducer
 */
import { ReactNode, createContext, useContext, useReducer } from 'react';

import { LayoutState } from '@dashboard/modules/layout/types/types';

type Action =
  | { type: 'setDrawerOpen'; data: boolean }
  | { type: 'setDrawerWidth'; data: number }
  | { type: 'setAppBarHeight'; data: number };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type LayoutContextType = { state: LayoutState; dispatch: Dispatch };

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

function layoutReducer(state: LayoutState, action: Action): LayoutState {
  switch (action.type) {
    case 'setDrawerOpen': {
      return { ...state, drawerOpen: action.data };
    }
    case 'setDrawerWidth': {
      return { ...state, drawerWidth: action.data };
    }
    case 'setAppBarHeight': {
      return { ...state, appBarHeight: action.data };
    }
    default:
      return state;
  }
}

type LayoutProviderProps = { children: ReactNode };

function LayoutProvider({ children }: LayoutProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(layoutReducer, {
    drawerOpen: false,
    drawerWidth: 0,
    appBarHeight: 0,
  });

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
}

function useLayout(): LayoutContextType {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayout };
