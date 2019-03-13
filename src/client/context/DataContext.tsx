import React, { createContext, useState, useContext, useEffect } from 'react';
import { get } from 'idb-keyval';

const initialState = {
  accounts: [],
  init: false,
  id: null,
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
          fetchingAccounts: false,
        });
      })

    window.addEventListener('message', (e) => {
      if (e.origin !== location.origin) {
        const { type, payload } = e.data;
        if (type !== 'init') return;

        dispatch({
          ...state,
          init: true,
          ...payload,
        })
      }
    })
  }, []);

  const { init, fetchingAccounts } = state;
  console.log(state);
  if (!init || fetchingAccounts) return null;

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  )
}