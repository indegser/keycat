import {
  createStore,
} from 'redux';
import React, { createContext, useContext, useReducer } from 'react';

import reducer from './reducer';

export const store = createStore(
  reducer,
);

const initialState = store.getState();

const StoreContext = createContext({
  state: initialState,
  dispatch: null,
});

export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  (window as any).state = state;

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}