import React, { createContext, useState, useContext, useEffect } from 'react';
import { get } from 'idb-keyval';

const initialState = {
  accounts: [],
  init: false,
  fetchingAccounts: true,
  selectedAccount: null,
}

export const DataContext = createContext(initialState);
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useState(initialState);

  useEffect(() => {
    get<string>('accounts')
      .then((data) => {
        const accounts = data ? JSON.parse(data) : [];
        dispatch({
          ...state,
          accounts,
          init: true,
          fetchingAccounts: false,
        });
      })
  }, []);

  const { init } = state;
  if (!init) return null;

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  )
}