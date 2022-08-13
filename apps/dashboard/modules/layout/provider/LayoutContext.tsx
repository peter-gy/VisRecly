/**
 * Possible actions to dispatch to the reducer
 */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import useMuiAppBarHeight from '@dashboard/hooks/useMuiAppBarHeight';
import useWindowSize from '@dashboard/hooks/useWindowSize';
import { LayoutState } from '@dashboard/modules/layout/types/types';

type Action =
  | { type: 'setDrawerOpen'; data: boolean }
  | { type: 'setDrawerWidth'; data: number }
  | { type: 'setAppBarHeight'; data: number }
  | { type: 'setWindowSize'; data: { width: number; height: number } };

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
    case 'setWindowSize': {
      return {
        ...state,
        windowWidth: action.data.width,
        windowHeight: action.data.height,
      };
    }
    default:
      return state;
  }
}

type LayoutProviderProps = { children: ReactNode };

function LayoutProvider({ children }: LayoutProviderProps): JSX.Element {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const appBarHeight = useMuiAppBarHeight();
  const [state, dispatch] = useReducer(layoutReducer, {
    windowWidth,
    windowHeight,
    appBarHeight,
    drawerOpen: false,
    drawerWidth: 0,
  });
  useEffect(() => {
    dispatch({
      type: 'setWindowSize',
      data: { width: windowWidth, height: windowHeight },
    });
  }, [windowWidth, windowHeight]);
  useEffect(() => {
    dispatch({ type: 'setAppBarHeight', data: appBarHeight });
  }, [appBarHeight]);

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
