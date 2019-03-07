import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getAccounts } from 'api/eos';
import { saveAccountToIDB } from 'actions/accountActions';
import { useData } from 'context/DataContext';
import { postMessage } from 'api/popup';

const Status = ({ path, location }) => {
  const { accounts } = useData();

  const runTask = async (type, values) => {
    const { username, password } = values;
    const [account] = await getAccounts(password);
    if (account !== username) {
      alert('Different account name found');
      return;
    }
  
    await saveAccountToIDB(accounts, account);
    postMessage({ type: 'signin', payload: username });
  }

  useEffect(() => {
    const { state: { type, values } } = location;
    runTask(type, values)
  }, []);
  return null;
}

export default Status;
